<template>
  <v-card class="company-details-bar">
    <p class="company-id">{{ companyId }}</p>
    <v-img v-if="companyLogo" class="company-logo" :src="companyLogo"></v-img>
    <v-row no-gutters justify="center" align="center" class="mt-5">
      <v-img
        class="users-icon"
        :src="require('../../assets/images/business/users-icon.png')"
      ></v-img>
      <p class="users-number" :class="arabicLanguage?'users-number-ar':''">{{ allowedAmount }}</p>
    </v-row>
    <p class="users-text">{{$t('totalNumberOfAllowedUsersText')}}</p>
    <v-divider class="mt-4"></v-divider>
    <v-row class="mt-4" no-gutters>
      <v-img
        class="user-icon"
        :src="require('../../assets/images/business/user-icon.png')"
      ></v-img>
      <p class="icon-text">{{ companyName }}</p>
    </v-row>
    <v-divider class="mt-2"></v-divider>
    <v-row class="mt-4" no-gutters>
      <v-img
        class="email-icon"
        :src="require('../../assets/images/business/email-icon.png')"
      ></v-img>
      <p class="icon-text">{{ companyEmail }}</p>
    </v-row>
    <v-divider class="mt-2"></v-divider>
    <v-row v-if="companyAddress" class="mt-4" no-gutters>
      <v-img
        class="location-icon"
        :src="require('../../assets/images/business/location-icon.png')"
      ></v-img>
      <p class="icon-text">{{ companyAddress }}</p>
    </v-row>
    <v-divider v-if="companyAddress" class="mt-2"></v-divider>
  </v-card>
</template>

<script>
export default {
  name: 'DashBoardSideBar',
  components: {},
  props: {
    companyId: {
      type: String,
      default: '(COMPANY ID)',
      required: true,
    },
    companyLogo: {
      type: String,
      default: null,
      required: false,
    },
    allowedAmount: {
      type: Number,
      default: 0,
      required: false,
    },
    companyName: {
      type: String,
      default: "The Company's Name",
      required: false,
    },
    companyEmail: {
      type: String,
      default: 'Company Email',
      required: false,
    },
    companyAddress: {
      type: String,
      default: 'Company Address',
      required: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.company-details-bar {
  min-height: 763px;
  max-width: 304px;
  margin-top: 41px;
  margin-left: 30px;
  margin-bottom: 104px;
  .company-id {
    background: #f6f8fb;
    min-height: 44px;
    // font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    text-align: center;
    padding-top: 13px;
  }
  .company-logo {
    max-width: 127px;
    max-height: 103px;
    border-radius: 15px;
    margin-left: auto;
    margin-right: auto;
  }
  .users-icon {
    border-radius: 6px;
    max-width: 42px;
    max-height: 42px;
  }
  .users-number {
    margin-bottom: 0;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 37px;
    line-height: 43px;
    color: #223354;
    margin-left: 16px;
  }
  .users-number-ar{
    margin-left: unset;
    margin-right: 16px;
  }
  .users-text {
    margin-top: 16px;
    // font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    text-transform: capitalize;
    color: #223354;
  }
  .user-icon {
    max-width: 16px;
    max-height: 16px;
    margin-left: 14px;
    margin-right: 14px;
  }
  .email-icon {
    max-width: 20px;
    max-height: 16px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .location-icon {
    max-width: 14px;
    max-height: 20px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .icon-text {
    // font-family: 'Roboto';
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    text-transform: capitalize;
    color: #223354;
    margin-bottom: 0;
  }
}
</style>
