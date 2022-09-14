<template>
  <v-container>
    <v-row no-gutters align="center" justify="center" class="table-title">
      <p>Business Report {{ companyId }}</p>
    </v-row>
    <v-row no-gutters class="header-filter-row">
      <v-col cols="2">
        <v-select
          v-model="sortBy"
          :items="sortItems"
          item-text="text"
          item-value="value"
          :label="$t('sortByLabel')"
          outlined
          :clearable="true"
          :hide-details="true"
          dense
          @change="sortData"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="filterByPlan"
          :items="filterByPlanItems"
          item-text="name"
          item-value="id"
          :label="$t('filterByPlanLabel')"
          outlined
          :clearable="true"
          :hide-details="true"
          :class="arabicLanguage ? 'pr-2' : 'pl-2'"
          dense
          @change="sortData"
        ></v-select>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          dense
          outlined
          :label="$t('searchLabel')"
          :placeholder="$t('searchPlaceHolder')"
          hide-details
          class="px-2"
          @input="searchData"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      v-model="selected"
      :headers="tableHeaders"
      :items="tableData"
      :single-select="true"
      :sort-by="sortBy"
      mobile-breakpoint="0"
      hide-default-footer
      item-key="id"
      show-select
      :loading="tableLoading"
    >
      <template #[`item.status`]="{ item }">
        <v-chip label :color="getColor(item.status)" dark>
          <span class="item-status" :class="getStatusClass(item.status)">
            {{ item.status }}</span
          >
        </v-chip>
      </template>
      <template #[`item.savings`]="{ item }">
        <v-chip label color="#F2F5F7">
          <span class="item-savings"> {{ item.savings }}</span>
        </v-chip>
      </template>
      <template #[`item.id`]="{ item }">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-icon
              color="primary"
              dense
              :class="arabicLanguage ? 'ml-3' : 'mr-3'"
              class="icon-effect"
              v-bind="attrs"
              v-on="on"
              @click="requestUserEdit(item.id)"
              >mdi-pencil</v-icon
            >
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip v-if="deletUsersAccess" top>
          <template #activator="{ on, attrs }">
            <v-icon
              color="red"
              dense
              class="icon-effect"
              v-bind="attrs"
              v-on="on"
              @click="requestUserDeleteConfirmation(item.id)"
              >mdi-delete-outline</v-icon
            >
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
      <template slot="body.append">
        <tr class="v-data-table-header">
          <th></th>
          <th><span></span></th>
          <th><span></span></th>
          <th><span></span></th>
          <th><span></span></th>
          <th
            role="columnheader"
            scope="col"
            aria-label="COUPONS REDEEMED"
            class="text-center coupons-cell"
          >
            <span>{{ couponsSum }}</span>
          </th>
          <th
            role="columnheader"
            scope="col"
            aria-label="TOTAL SAVINGS (SAR)"
            class="text-start"
          >
            <v-chip label color="#F2F5F7">
              <span class="item-savings"> {{ savingsSum }}</span>
            </v-chip>
          </th>
          <th>
            <span>{{ $t('total') }}</span>
          </th>
        </tr>
      </template>
    </v-data-table>
    <v-pagination
      v-model="currentPage"
      :length="pagesCount"
      class="mt-2"
      @input="changePage"
    ></v-pagination>
    <confirm-pop-up
      :pop-up="confirmPopUp"
      @close="closeDeleteUserPopUp"
      @confirm="deleteUser"
    ></confirm-pop-up>
  </v-container>
</template>

<script>
import Api from '../../services/Api'
import ConfirmPopUp from '../common/ConfrimPopUp.vue'

export default {
  name: 'DashBoardTable',
  components: {
    ConfirmPopUp,
  },
  props: {
    update: {
      type: Boolean,
      default: false,
    },
    companyId: {
      type: String,
      default: '(COMPANY ID)',
      required: false,
    },
  },

  data() {
    return {
      selected: [],
      tableLoading: true,
      tableHeaders: [
        { text: this.$t('users'), value: 'user', sortable: false },
        { text: this.$t('plan'), value: 'plan', sortable: false },
        { text: this.$t('regDate'), value: 'date', sortable: false },
        { text: this.$t('status'), value: 'status', sortable: false },
        {
          text: this.$t('couponsRedeemed'),
          value: 'coupons',
          align: 'center',
          cellClass: 'coupons-cell',
          sortable: false,
        },
        { text: this.$t('totalSavingsSAR'), value: 'savings', sortable: false },
        { text: this.$t('actions'), value: 'id', sortable: false },
      ],
      tableData: [],
      currentPage: 1,
      pagesCount: 1,
      search: '',
      // sortItems: ['user', 'plan', 'date', 'status', 'coupons', 'savings'],
      sortItems: [
        {
          text: this.$t('users'),
          value: 'name',
        },
        {
          text: this.$t('plan'),
          value: 'plan.name',
        },
        {
          text: this.$t('regDate'),
          value: 'registered_date',
        },
        {
          text: this.$t('status'),
          value: 'status',
        },
        {
          text: this.$t('coupons'),
          value: 'coupons_redeemed',
        },
        {
          text: this.$t('savings'),
          value: 'total_savings',
        },
      ],
      sortBy: null,
      filterByPlan: null,
      filterByPlanItems: [],
      confirmPopUp: false,
      tempUser: null,
    }
  },
  async fetch() {
    const page = this.$route.query.page
    let url = Api.users.GetUsers.replace('{page}', page)
    if (this.filterByPlan !== null) {
      url = url + `&filter[plan][_eq]=${this.filterByPlan}`
    }
    if (this.sortBy != null) {
      if (this.arabicLanguage && this.sortBy === 'name') {
        url = url + `&sort[]=arabic_name`
      } else if (this.arabicLanguage && this.sortBy === 'plan.name') {
        url = url + `&sort[]=plan.arabic_name`
      } else if (this.arabicLanguage && this.sortBy === 'status') {
        url = url + `&sort[]=arabic_status`
      } else {
        url = url + `&sort[]=${this.sortBy}`
      }
    }
    if (this.search.trim() !== '') {
      url = url + `&search=${this.search}`
    }
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.$store.getters['login/token'],
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        this.pagesCount = Math.ceil(data.meta.filter_count / 10)
        this.tableData = data.data.map((x) => {
          if (this.arabicLanguage) {
            return {
              id: x.id,
              user: x.arabic_name,
              plan: x.plan.arabic_name,
              planId: x.plan.id,
              date: x.registered_date,
              status: x.arabic_status,
              coupons: x.coupons_redeemed,
              savings: x.total_savings,
            }
          } else {
            return {
              id: x.id,
              user: x.name,
              plan: x.plan.name,
              planId: x.plan.id,
              date: x.registered_date,
              status: x.status,
              coupons: x.coupons_redeemed,
              savings: x.total_savings,
            }
          }
        })
        this.tableLoading = false
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  computed: {
    plans() {
      return this.$store.getters['plans/getPlans']
    },
    savingsSum() {
      const sum = this.tableData.reduce((accumulator, object) => {
        return accumulator + object.savings
      }, 0)
      return sum
    },
    couponsSum() {
      const sum = this.tableData.reduce((accumulator, object) => {
        return accumulator + object.coupons
      }, 0)
      return sum
    },
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
    deletUsersAccess() {
      return this.$store.getters['login/user'].can_delete_users
    },
  },
  watch: {
    update(newVal, oldVal) {
      // watch it
      this.$fetch()
    },
  },
  created() {
    this.plansSetter()
  },
  methods: {
    getColor(status) {
      if (status.toLowerCase() === 'active') {
        return '#ECFBE6'
      } else {
        return '#FFE8EC'
      }
    },
    getStatusClass(status) {
      if (status.toLowerCase() === 'active' || status === 'نشط') {
        return 'item-status-green'
      } else {
        return 'item-status-red'
      }
    },
    requestUserDeleteConfirmation(id) {
      this.tempUser = id
      this.confirmPopUp = true
    },
    closeDeleteUserPopUp() {
      this.tempUser = null
      this.confirmPopUp = false
    },
    async deleteUser() {
      this.confirmPopUp = false
      const userIndex = this.tableData.findIndex(
        (user) => user.id === this.tempUser
      )
      const planIndex = this.plans.findIndex(
        (plan) => plan.plans_id === this.tableData[userIndex].planId
      )

      if (this.tempUser !== null) {
        const url = Api.users.AddUser + '/' + this.tempUser
        await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.$store.getters['login/token'],
          },
        })
          .then((response) => {
            if (response.ok) {
              this.$fetch()
              this.updatePlanAmount(
                this.plans[planIndex].id,
                this.plans[planIndex].active_amount - 1,
                this.plans[planIndex].remaining_amount + 1
              )
              this.$store.dispatch('plans/setPlans')
              this.$store.dispatch('plans/setPlansChanged')
              return response.json()
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },
    async updatePlanAmount(id, activeAmount, remainingAmount) {
      const url = Api.plans.UpdateOrganisationPlans.replace('{id}', id)
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['login/token'],
        },
        body: JSON.stringify({
          active_amount: activeAmount,
          remaining_amount: remainingAmount,
        }),
      })
        .then((response) => {
          if (response.ok) {
            this.$fetch()
            return response.json()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async changePage() {
      this.$route.query.page = this.currentPage
      this.tableData = []
      this.tableLoading = true
      await this.$fetch()
      this.tableLoading = false
    },
    async searchData() {
      this.tableData = []
      if (this.search.trim() !== '') {
        this.$route.query.page = 1
        this.currentPage = 1
        this.tableLoading = true
        await this.$fetch()
        this.tableLoading = false
      } else {
        this.tableLoading = true
        await this.$fetch()
        this.tableLoading = false
      }
    },
    async sortData() {
      this.tableLoading = true
      await this.$fetch()
      this.tableLoading = false
    },
    requestUserEdit(userId) {
      this.$store.dispatch('userEdit/setUserIdState', userId)
    },
    async plansSetter() {
      this.filterByPlanItems = []
      await this.$store.dispatch('plans/setPlans')
      const result = this.$store.getters['plans/getPlans']

      for (const id in result) {
        this.addPlan(result[id].plans_id)
      }
    },
    async addPlan(id) {
      await fetch(Api.plans.GetSingPlan.replace('{id}', id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['login/token'],
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((data) => {
          if (this.arabicLanguage) {
            this.filterByPlanItems.push({
              id: data.data.id,
              name: data.data.arabic_name,
            })
          } else {
            this.filterByPlanItems.push({
              id: data.data.id,
              name: data.data.name,
            })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.table-title {
  background: #f6f8fb;
  border-radius: 6px 6px 0px 0px;
  min-height: 42px;
  p {
    margin-bottom: 0;
    // font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;

    color: #223354;
  }
}
.header-filter-row {
  background-color: white;
  padding: 15px 14px;
}
.v-data-table :deep(.v-data-table-header) {
  background: #f6f8fb;
}
.v-data-table :deep(.coupons-cell) {
  font-weight: 700;
}
.item-status {
  // font-family: 'Roboto';
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-transform: capitalize;
}
.item-status-red {
  color: #ff1a43;
}
.item-status-green {
  color: #3bb900;
}
.item-savings {
  font-size: 14px;
}
.icon-effect:hover {
  transform: scale(1.25);
}
</style>
