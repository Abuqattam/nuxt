<template>
  <v-container fluid class="navbar-body">
    <v-row align="center">
      <v-col>
        <v-row class="my-2" align="center">
          <nuxt-link :to="localePath('/')">
            <v-img
              class="logo-top"
              :src="require('../../../assets/images/business/top-nav-logo.png')"
            ></v-img>
          </nuxt-link>
          <p class="mb-0 ml-12">Dashboard <span></span></p>
        </v-row>
      </v-col>
      <v-col>
        <v-row class="my-2" align="center" justify="end">
          <nuxt-link :to="localePath('/')">
            <v-img
              class="setting-icon"
              :src="require('../../../assets/images/business/setting-icon.svg')"
            ></v-img>
          </nuxt-link>
          <v-img
            v-if="companyLogo"
            class="company-logo"
            :src="companyLogo"
          ></v-img>
          <div class="company-details">
            <p class="company-title mb-0">{{ companyName }}</p>
            <p class="company-email mb-0">{{ companyEmail }}</p>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BuisnessNavBar',
  props: {
    companyLogo: {
      type: String,
      default: null,
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
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.navbar-body {
  background-color: white;
}
.logo-top {
  width: 108px;
  height: 47px;
  margin-left: 42px;
}
.logo-top:hover,
.setting-icon:hover {
  transform: scale(0.85);
}
p {
  position: relative;
  span {
    position: absolute;
    height: 4px;
    width: 28px;
    background-color: #1a75ff;
    border-radius: 74px;
    bottom: -5px;
    left: 0;
  }
}
.setting-icon {
  width: 20px;
  height: 20px;
}
.company-logo {
  max-width: 44px;
  max-height: 44px;
  margin-left: 35px;
  border-radius: 6px;
}
.company-details {
  min-width: 180px;
  max-height: 44px;
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  margin-right: 12px;
}
.company-title {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
}
.company-email {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #6e759f;
}
@media only screen and (max-width: 768px) {
  .company-details,
  .company-logo {
    display: none;
  }
  .setting-icon {
    margin-right: 15px;
  }
  p {
    display: none;
  }
}
</style>
