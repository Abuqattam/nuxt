<template>
  <div>
    <nav-bar
      dir="ltr"
      :company-logo="companyLogo"
      :company-name="user.organization_name"
      :company-email="user.email"
    ></nav-bar>
    <v-container fluid class="fill-height dashboard-body">
      <v-row no-gutters class="fill-height">
        <v-col no-gutters>
          <v-row>
            <v-col md="3" class="d-none d-md-block">
              <dash-board-side-bar
                :company-id="user.organization_name"
                :company-logo="companyLogo"
                :company-name="user.organization_name"
                :company-email="user.email"
                :company-address="user.location"
                :allowed-amount="user.totalAllowedAmount"
              ></dash-board-side-bar>
            </v-col>
            <v-col md="9">
              <statistics-view></statistics-view>
              <v-row no-gutters justify="end">
                <v-btn
                  depressed
                  color="primary"
                  class="add-user-button"
                  :class="arabicLanguage?'add-user-button-ar':''"
                  @click="openDrawer"
                  >+ {{$t('addUser')}}
                </v-btn>
              </v-row>
              <dash-board-table
                :update="tableUpdate"
                :company-id="user.organization_name"
              ></dash-board-table>
            </v-col>
            <user-drawer
              :show="showDrawer"
              @close="closeDrawer"
              @userAdded="updateTable"
            ></user-drawer>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from '../../services/Api'
import NavBar from '../../components/buiseness/layout/NavBar.vue'
import DashBoardSideBar from '../../components/buiseness/DashBoardSideBar.vue'
import StatisticsView from '../../components/buiseness/StatisticsView.vue'
import DashBoardTable from '../../components/buiseness/DashBoardTable.vue'
import UserDrawer from '../../components/buiseness/UserDrawer.vue'

export default {
  name: 'BusinessDashBoard',
  components: {
    NavBar,
    DashBoardSideBar,
    StatisticsView,
    DashBoardTable,
    UserDrawer,
  },

  data() {
    return {
      showDrawer: false,
      tableUpdate: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['login/user']
    },
    companyLogo() {
      if (this.user.avatar) {
        return Api.localFiles + this.user.avatar
      }
      return null
    },
    userIdUpdate() {
      return this.$store.getters['userEdit/getUserId']
    },
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
  },
  watch: {
    userIdUpdate(newVal, oldVal) {
      if (newVal != null && newVal !== undefined) {
        this.openDrawer()
      }
    },
  },
  created() {
    this.$store.dispatch('loader/reverseLoader')
    if (this.user == null || this.user.id == null) {
      this.$router.replace(this.localePath({ name: 'businessAuthentication' }))
    }
    this.$store.dispatch('loader/reverseLoader')
    if (this.user != null || this.user.id == null) {
      this.$store.dispatch('plans/setPlans')
    }
  },
  methods: {
    closeDrawer() {
      this.showDrawer = false
    },
    openDrawer() {
      this.showDrawer = true
    },
    updateTable() {
      this.showDrawer = false
      this.tableUpdate = !this.tableUpdate
    },
  },
}
</script>
<style lang="scss" scoped>
.dashboard-body {
  font-family: NotoIKEAArabic-regular;
  background-color: #f1f5f4;
}
// .cards-row-body {
//   margin-top: 62px;
// }
.add-user-button {
  border-radius: 6px;
  margin-top: 24px;
  margin-right: 16px;
  margin-bottom: 24px;
  // font-family: 'Roboto';
  font-family: NotoIKEAArabic-regular;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-transform: none;
}
.add-user-button-ar{
  margin-right: unset;
  margin-left: 16px;
}
.v-menu__content{
  font-family: NotoIKEAArabic-regular;

}
</style>
