<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <nuxt-link :to="localePath('/')">
        <v-img
          :class="arabicLanguage ? 'logo-top-ar' : 'logo-top'"
          :src="require('../../assets/images/business/top-nav-logo.png')"
        ></v-img>
      </nuxt-link>
      <v-col md="4" class="d-none d-md-block">
        <!-- sidebar logo with text goes here -->
        <v-container class="fill-height">
          <v-row class="fill-height">
            <v-col
              :class="arabicLanguage ? 'side-bar-text-ar-margin' : ''"
              align-self="center"
            >
              <p class="side-bar-title">{{ $t('loginSideBarTitle') }}</p>
              <v-img
                class="logo-side-bar"
                :src="require('../../assets/images/business/side-logo.png')"
              ></v-img>
              <p class="side-bar-text">
                {{ $t('loginSideBarDescription') }}
              </p>
              <p class="side-bar-sub-title">{{ $t('loginSideBarSubTitle') }}</p>
              <p class="side-bar-text">
                {{ $t('loginSideBarSubDescription') }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col md="8" style="background-color: #f1f5f4">
        <v-row class="header-row" justify="end" align="center" style="">
          <!-- <nuxt-link
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            >{{ locale.name }}</nuxt-link
          > -->
          <v-menu v-model="languageMenu" offset-y>
            <template #activator="{ on, attrs }">
              <v-btn class="text-capitalize" v-bind="attrs" text v-on="on">
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
        </v-row>
        <!-- here goes the main body for the login form -->
        <v-container class="form-container">
          <v-row class="fill-height">
            <!-- login section -->
            <v-col v-if="!lostPassword" align-self="center">
              <h1>{{ $t('signIn') }}</h1>
              <h5>{{ $t('signInDescription') }}</h5>
              <v-text-field
                ref="email"
                v-model="email"
                pattern="^([0-9]+([\.][0-9]+)?)|([\u0660-\u0669]+([\.][\u0660-\u0669]+)?)$"
                :rules="[rules.required, rules.email]"
                :label="$t('emailLabel')"
                outlined
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                :label="$t('passwordLabel')"
                outlined
                hide-details="auto"
                @click:append="showPassword = !showPassword"
              >
              </v-text-field>
              <v-row no-gutters justify="space-between" align="center">
                <v-checkbox
                  ref="termsCheck"
                  v-model="termsCheck"
                  :rules="[rules.required]"
                >
                  <template #label>
                    <div>
                      {{ $t('acceptPartial') }}
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <a
                            target="_blank"
                            href="https://vuetifyjs.com"
                            @click.stop
                            v-on="on"
                          >
                            {{ $t('termsAndCondition') }}
                          </a>
                        </template>
                        Opens in new window
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
                <nuxt-link to="" @click.native="lostPassword = !lostPassword">
                  {{ $t('lostPassword') }}
                </nuxt-link>
              </v-row>
              <v-row
                v-if="wrongCredintials"
                no-gutters
                justify="space-between"
                align="center"
              >
                <p class="worng-crediantials">
                  {{ $t('wrongLogInCredientialsMessage') }}
                </p>
              </v-row>
              <v-btn block depressed color="primary" @click="submitSignIn">
                {{ $t('signIn') }}
              </v-btn>
            </v-col>
            <!-- lost password section -->
            <v-col v-else no-gutters align-self="center">
              <v-card>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-card-text>
                        <div class="password-card-title">
                          {{ $t('recoverPasswordTitle') }}
                        </div>
                        <div>
                          {{ $t('recoverPasswordDescription') }}
                        </div>
                        <v-text-field
                          v-model="email"
                          pattern="^([0-9]+([\.][0-9]+)?)|([\u0660-\u0669]+([\.][\u0660-\u0669]+)?)$"
                          :rules="[rules.required, rules.email]"
                          :label="$t('emailLabel')"
                          outlined
                          class="mt-12"
                        ></v-text-field>
                        <v-btn block depressed color="primary">
                          {{ $t('recoverPasswordButtonText') }}
                        </v-btn>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-row class="after-card-row" justify="end">
                <p>
                  {{ $t('wantToTrySignInAgain') }}
                  <nuxt-link to="" @click.native="lostPassword = !lostPassword">
                    {{ $t('clickHere') }}
                  </nuxt-link>
                </p>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BusinessAuthentication',
  components: {},
  data() {
    return {
      languageMenu: false,
      email: '',
      password: '',
      termsCheck: false,
      showPassword: false,
      lostPassword: false,
      formHasErrors: false,
      wrongCredintials: false,
      rules: {
        required: (value) => !!value || this.$t('required'),
        min: (v) => v.length >= 8 || 'Min 8 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password,
      }
    },
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
  methods: {
    async submitSignIn() {
      let formValidated = false
      formValidated = this.$refs.email.validate(this.rules.email)
      formValidated =
        this.$refs.password.validate(this.rules.min) && formValidated
      formValidated =
        this.$refs.termsCheck.validate(this.rules.required) && formValidated
      if (formValidated) {
        try {
          this.$store.dispatch('loader/reverseLoader')
          const loginSuccess = await this.$store.dispatch('login/login', {
            email: this.email,
            password: this.password,
          })
          if (loginSuccess) {
            this.$store.dispatch('loader/reverseLoader')
            this.wrongCredintials = false
            this.$router.push(
              this.localePath({
                name: 'businessDashBoard',
                query: { page: '1' },
              })
            )
          }
        } catch (err) {
          this.$store.dispatch('loader/reverseLoader')
          this.wrongCredintials = true
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.logo-top {
  position: absolute;
  top: 11px;
  left: 42px;
  width: 108px;
  height: 47px;
}
.logo-top-ar {
  position: absolute;
  top: 11px;
  right: 42px;
  width: 108px;
  height: 47px;
}
.logo-top:hover {
  transform: scale(0.95);
}
.container {
  padding: 0 12px;
  // padding: 0;
}
.header-row {
  height: 75px;
  background-color: white;
  padding: 20px;
  border-bottom: 2px solid #e6eaed;
}
.form-container {
  max-width: 500px;
  height: calc(100% - 40px);
}
h1 {
  font-family: NotoIKEAArabic-bold;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}
h5 {
  font-family: NotoIKEAArabic-regular;
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
}
.v-btn {
  text-transform: unset;
  font-family: NotoIKEAArabic-regular;
}
.password-card-title {
  font-size: 30px;
  color: black;
  font-weight: bold;
  margin-bottom: 12px;
}
.v-card:deep(.v-card__text) {
  font-family: NotoIKEAArabic-regular;
}
.after-card-row {
  font-family: NotoIKEAArabic-regular;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
  font-weight: bold;
}
.side-bar-title {
  // font-family: 'Roboto';
  font-family: NotoIKEAArabic-bold;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 120%;
  margin-left: 21px;
}
.logo-side-bar {
  max-width: 330px;
  max-height: 163px;
  margin-left: 21px;
}
.side-bar-text {
  // font-family: 'Roboto';
  font-family: NotoIKEAArabic-regular;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 128.4%;
  margin-left: 21px;
  margin-top: 16px;
}
.side-bar-sub-title {
  // font-family: 'Roboto';
  font-family: NotoIKEAArabic-bold;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-left: 21px;
}
.side-bar-text-ar-margin {
  p {
    margin-left: unset;
    margin-right: 21px;
  }
  .logo-side-bar {
    margin-left: unset;
    margin-right: 21px;
    transform: scaleX(-1);
  }
}
.v-input {
  font-family: NotoIKEAArabic-regular;
}
a {
  font-family: NotoIKEAArabic-regular;
}
.v-input:deep(.v-messages__message) {
  line-height: unset;
}
.worng-crediantials {
  color: red;
}
</style>
