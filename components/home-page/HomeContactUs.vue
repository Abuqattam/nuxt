<template>
  <div dir="rtl" class="contact-section">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12" lg="6" xl="6">
          <div class="cont-img">
            <img src="../../assets/images/hand.png" alt="" />
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="6" xl="6">
          <div  class="cont-data" :class="!arabicLanguage?'left-to-right':''">
            <div class="cont-head">
              <h3>{{$t('joinOurPartnersTitle')}}</h3>
              <p>
                {{$t('joinOurPartnersBrief')}}
              </p>
            </div>
            <div class="cont-form">
              <v-form ref="form">
                <v-row>
                  <v-col class="py-0" cols="12" sm="6" md="6" lg="6" xl="6">
                    <label> {{$t('ArabicTradeMarkName')}}</label>
                    <v-text-field
                      ref="brandArabicName"
                      v-model="brandArabicName"
                      :rules="[rules.required, rules.blank]"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6" lg="6" xl="6">
                    <label> {{$t('EnglishTradeMarkName')}}</label>
                    <v-text-field
                      ref="brandEnglishName"
                      v-model="brandEnglishName"
                      :rules="[rules.required, rules.blank]"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6" lg="6" xl="6">
                    <label> {{$t('govRegNumber')}}</label>
                    <v-text-field
                      ref="govRegNumber"
                      v-model="govRegNumber"
                      :rules="[rules.required, rules.blank]"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6" lg="6" xl="6">
                    <label> {{$t('companyActivities')}}</label>
                    <v-text-field
                      ref="companyActivities"
                      v-model="companyActivities"
                      :rules="[rules.required, rules.blank]"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6" lg="6" xl="6">
                    <label> {{$t('companyOwnerName')}}</label>
                    <v-text-field
                      ref="ownerName"
                      v-model="ownerName"
                      :rules="[rules.required, rules.blank]"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6" lg="6" xl="6">
                    <label> {{$t('companyPhoneNumber')}}</label>
                    <v-text-field
                      ref="phoneNumber"
                      v-model="phoneNumber"
                      :rules="[rules.required, rules.blank]"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="12" md="12" lg="12" xl="12">
                    <label> {{$t('companyEmail')}}</label>
                    <v-text-field
                      ref="email"
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-checkbox
                      ref="termsCheck"
                      v-model="termsCheck"
                      :rules="[rules.required]"
                      color="white"
                      class="accept-terms"
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
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <button type="button" class="btn" @click="submitForm">
                      {{$t('joinOurPartnersSubmitButtonText')}}
                    </button>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <button type="button" @click="dialog = false">
          <i class="la la-close"></i>
        </button>

        <div class="dialog-body">
          <img src="../../assets/images/check.svg" alt="" />
          <h4>تم إرسال الطلب بنجاح</h4>
          <p>
            ستتصل بك ديل ستيشن قريباً <br />
            شكرا لك!
          </p>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Api from '../../services/Api'
export default {
  name: 'HomeContactUs',
  data() {
    return {
      dialog: null,
      brandArabicName: '',
      brandEnglishName: '',
      govRegNumber: '',
      companyActivities: '',
      ownerName: '',
      phoneNumber: '',
      email: '',
      termsCheck: false,
      rules: {
        required: (value) => !!value || this.$t('required'),
        min: (v) => v.length >= 8 || 'Min 8 characters',
        blank: (v) => (v && !!v.trim()) || 'Value cannot be blank',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  computed: {
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
  },
  methods: {
    submitForm() {
      let formValidated = false
      formValidated = this.$refs.brandArabicName.validate(this.rules.required)
      formValidated =
        this.$refs.brandEnglishName.validate(this.rules.required) &&
        formValidated
      formValidated =
        this.$refs.govRegNumber.validate(this.rules.required) && formValidated
      formValidated =
        this.$refs.companyActivities.validate(this.rules.required) &&
        formValidated
      formValidated =
        this.$refs.ownerName.validate(this.rules.required) && formValidated
      formValidated =
        this.$refs.phoneNumber.validate(this.rules.required) && formValidated
      formValidated =
        this.$refs.email.validate(this.rules.required) && formValidated
      formValidated =
        this.$refs.termsCheck.validate(this.rules.required) && formValidated

      if (formValidated) {
        const body = JSON.stringify({
          brand_name_arabic: this.brandArabicName,
          brand_name_english: this.brandEnglishName,
          gov_reg_number: this.govRegNumber,
          company_activities: this.companyActivities,
          owner_name: this.ownerName,
          phone_number: this.phoneNumber,
          email: this.email,
        })
        this.postRecord(body)
      }
    },
    async postRecord(body) {
      await fetch(Api.contactUs.postRecord, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
        .then(() => {
          this.dialog = true
          this.resetForm()
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    resetForm() {
      this.$refs.brandArabicName.reset()
      this.$refs.brandEnglishName.reset()
      this.$refs.govRegNumber.reset()
      this.$refs.companyActivities.reset()
      this.$refs.ownerName.reset()
      this.$refs.phoneNumber.reset()
      this.$refs.email.reset()
    },
  },
}
</script>
<style lang="scss" scoped>
.contact-section {
  // background-color: #b199d0;
  background-color: #38145c;
  padding: 60px 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
  max-height: 800px;
}

.contact-section::before {
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

.contact-section::after {
  content: '';
  position: absolute;
  left: 30px;
  top: 20px;
  background-image: url(../../assets/images/logo-pattern.svg);
  background-size: contain;
  background-repeat: no-repeat;
  width: 50%;
  height: calc(100% - 40px);
  z-index: -1;
}

.cont-head {
  text-align: center;
  margin-bottom: 35px;
}

.cont-head h3 {
  font-family: ge-bold;
  font-size: 28px;
  margin-bottom: 10px;
  color: #fff;
}

.cont-head p {
  font-size: 16px;
  font-family: ge-medium;
  margin: 0 auto;
  max-width: 80%;
  color: #fff;
}

.v-input :deep(input) {
  background-color: #fff;
  border-radius: 50px;
  height: 40px;
  max-height: none;
  padding: 0 20px;
}

.v-input :deep(.v-input__slot::before),
.v-input :deep(.v-input__slot::after) {
  display: none;
}

.cont-form label {
  font-family: 'ge-bold';
  color: #fff;
}

.v-input {
  font-family: ge-medium;
  margin: 0 0 12px;
}

// .v-input :deep(.v-input__slot) {
//   margin: 0;
// }

// .v-input :deep(.v-text-field__details) {
//   display: none;
// }

.cont-form :deep(.btn) {
  margin: 0 auto;
  background-color: #fee633;
  border-radius: 50px;
  color: #34125b !important;
  font-family: 'ge-bold';
  font-size: 16px;
  min-width: 300px;
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

.v-dialog {
  box-shadow: none;
}

.v-dialog .v-card {
  border-radius: 8px;
  padding: 20px;
  box-shadow: none !important;
}

.v-dialog .v-card button {
  font-size: 28px;
}

.v-dialog .v-card button i {
  font-size: inherit;
}

.dialog-body {
  text-align: center;
  margin-top: 10px;
}

.dialog-body h4 {
  color: #34125b;
  font-family: 'ge-bold';
  font-size: 24px;
  margin: 30px 0 10px;
}

.dialog-body p {
  color: #34125b;
  font-family: 'ge-medium';
}
.accept-terms {
  color: white;
}
.accept-terms:deep(.v-label) {
  color: white;
}
.accept-terms:deep(.v-icon) {
  color: white;
}
.left-to-right{
  direction: ltr;
}
</style>
