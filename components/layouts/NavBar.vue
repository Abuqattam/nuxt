<template>
  <div>
    <header>
      <v-container fluid style="direction: ltr">
        <!-- <a href="#" class="btn order-1">تسجيل دخول التجار</a> -->
        <div class="logo order-2">
          <nuxt-link :to="localePath('/')">
            <img src="../../assets/images/logo.svg" />
            </nuxt-link>
        </div>
        <div
          class="company-link d-flex align-center order-3"
          style="direction: ltr"
        >
          <v-col no-gutters>
            <a href="#" class="btn order-1">تسجيل دخول التجار</a>
            <nuxt-link
              class="btn"
              :to="localePath({ name: 'businessAuthentication' })"
              >تسجيل دخول الشركات</nuxt-link
            >
          </v-col>
          <v-menu v-model="languageMenu" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                class="text-capitalize menue"
                v-bind="attrs"
                text
                v-on="on"
              >
                <v-icon left>mdi-translate</v-icon>
                {{ $i18n.locale }}
                <v-icon small right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
              >
                <v-list-item-title>{{ locale.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </header>
  </div>
</template>

<script>
// import Api from '../../services/Api'
export default {
  name: 'NavBar',
  data() {
    return {
      languageMenu: false,
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
  },
  created() {
    if (this.arabicLanguage) {
      this.$vuetify.rtl = true
    } else {
      this.$vuetify.rtl = false
    }
  },
  //   async fetch() {
  //     await fetch(Api.imageSlider.GetAll)
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json()
  //         }
  //       })
  //       .then((data) => {
  //         this.sliders = []
  //         if (data.data.length > 0) {
  //           const result = data.data.map((item) => {
  //             item.image = Api.localFiles + item.image
  //             return item
  //           })
  //           this.sliders = result
  //         }
  //       })
  //       .catch((error) => {
  //         // eslint-disable-next-line no-console
  //         console.log(error)
  //       })
  //   },
}
</script>
<style lang="scss" scoped>
header {
  // padding: 25px 0;
  position: relative;
  z-index: 1;
}

header::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/texture.svg);
  opacity: 0.1;
  background-repeat: repeat;
  z-index: -1;
}

header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.company-link {
  .btn:last-child {
    margin-top: 10px;
  }
}
.btn {
  background-color: #34125b;
  color: #fff !important;
  border-radius: 4px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  padding: 0 20px;
  transition: 0.3s;
  font-family: 'ge-medium';
  font-size: 14px;
}

.btn:hover {
  background-color: #474d54;
}

.logo {
  flex-grow: 1;
  text-align: center;
  img {
    // width: 104px;
    width: 144px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.v-application--is-rtl .v-btn__content .v-icon--left {
  margin-left: -4px;
  margin-right: 8px;
}
@media only screen and (max-width: 586px) {
  header .container {
    flex-direction: column;
  }
  .logo {
    order: 1;
  }
  .company-link {
    order: 2;
    margin-top: 20px;
  }
  .btn {
    order: 3;
    margin-top: 10px;
    width: 170px;
  }
  .menue {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
</style>
