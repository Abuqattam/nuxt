<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :right="arabicLanguage ? false : true"
      fixed
      temporary
    >
      <v-container class="user-container">
        <v-row>
          <v-col>
            <p class="user-title mb-0">{{ titleText }}</p>
            <p class="user-description" :class="disableEdit ? 'mp-0' : ''">
              {{ descriptionText }}
            </p>
            <section v-if="userIdUpdate == null && userIdUpdate == undefined">
              <p class="add-title">Multiple CSV users</p>
              <vue-csv-import
                v-if="show"
                v-model="csv"
                :headers="true"
                :map-fields="[
                  'arabicName',
                  'englishName',
                  'phonenumber',
                  'email',
                  'gender',
                  'city',
                  'dateOfBirth',
                ]"
                table-class="csv-mapping-table"
              >
                <template slot="hasHeaders" slot-scope="{ headers, toggle }">
                  <label>
                    <input
                      id="hasHeaders"
                      type="checkbox"
                      :value="headers"
                      @change="toggle"
                    />
                    Headers?
                  </label>
                </template>

                <template slot="error"> File type is invalid </template>

                <template slot="thead">
                  <tr>
                    <th>My Fields</th>
                    <th>Column</th>
                  </tr>
                </template>

                <template slot="next" slot-scope="{ load }">
                  <button @click.prevent="load">load!</button>
                </template>
              </vue-csv-import>
            </section>
            <v-divider class="mt-4"></v-divider>
            <p class="add-title mb-0">{{ $t('addManually') }}</p>
            <v-text-field
              ref="userName"
              v-model="userName"
              class="mt-6"
              :rules="[rules.required]"
              :placeholder="$t('userNamefieldPlaceHolder')"
              :label="$t('userNameField')"
              :disabled="disableEdit"
              outlined
            ></v-text-field>
            <v-text-field
              ref="arabicUserName"
              v-model="arabicUserName"
              :rules="[rules.required]"
              :placeholder="$t('userNamefieldPlaceHolder')"
              :label="$t('arabicUserNameField')"
              :disabled="disableEdit"
              outlined
            ></v-text-field>
            <v-text-field
              ref="phoneNumber"
              v-model="phoneNumber"
              :rules="[rules.required]"
              :label="$t('phoneNumberField')"
              :disabled="disableEdit"
              outlined
            ></v-text-field>
            <v-text-field
              ref="email"
              v-model="email"
              :rules="[rules.required, rules.email]"
              placeholder="example@example.com"
              :label="$t('emailLabel')"
              :disabled="disableEdit"
              outlined
            ></v-text-field>
            <p class="gender-title">{{ $t('gender') }}</p>
            <v-radio-group v-model="gender" :disabled="disableEdit" row>
              <v-radio :label="$t('male')" value="Male"></v-radio>
              <v-radio
                class="margin-radio"
                :label="$t('female')"
                value="Female"
              ></v-radio>
            </v-radio-group>
            <v-autocomplete
              ref="city"
              v-model="city"
              :items="cities"
              :rules="[rules.required]"
              :label="$t('cityFieldLabel')"
              :disabled="disableEdit"
              placeholder="Enter your city"
              outlined
            ></v-autocomplete>
            <v-dialog
              ref="dialog"
              v-model="calendarDialog"
              :return-value.sync="date"
              persistent
              :disabled="disableEdit"
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  ref="date"
                  v-model="date"
                  :label="$t('dateOfBirthLabel')"
                  append-icon="mdi-calendar"
                  outlined
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" :disabled="disableEdit" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="calendarDialog = false">
                  {{ $t('cancel') }}
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  {{ $t('ok') }}
                </v-btn>
              </v-date-picker>
            </v-dialog>
            <v-autocomplete
              ref="plan"
              v-model="plan"
              :items="plans"
              :rules="[rules.required]"
              :label="$t('subscriptionPlanSelectFieldLabel')"
              item-text="name"
              item-value="id"
              placeholder="Select your plan"
              :menu-props="{ top: true, offsetY: true }"
              outlined
            >
            </v-autocomplete>
            <v-btn block depressed color="primary" @click="submitForm">
              {{ buttonText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <v-snackbar v-model="snackbar" top :timeout="2000" color="red">
      the selected plan cant be assigned to this amount of users
    </v-snackbar>
  </div>
</template>

<script>
import Api from '../../services/Api'

export default {
  name: 'UserDrawer',
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'userAdded'],

  data() {
    return {
      userName: null,
      arabicUserName: null,
      phoneNumber: null,
      email: null,
      city: null,
      gender: 'Male',
      cities: ['Amman', 'Irbid'],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      calendarDialog: false,
      plan: null,
      tempPlan: null,
      csv: null,
      plans: [],
      snackbar: false,
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
    drawer: {
      get() {
        return this.show
      },
      set(newValue) {
        if (newValue === false) {
          this.csv = null
          this.$emit('close')
        }
      },
    },
    plansChnagedWatcher() {
      return this.$store.getters['plans/getPlansChanged']
    },
    organisationPlans() {
      return this.$store.getters['plans/getPlans']
    },
    userIdUpdate() {
      return this.$store.getters['userEdit/getUserId']
    },
    buttonText() {
      if (this.userIdUpdate != null && this.userIdUpdate !== undefined) {
        return this.$t('updateUserDrawerButtonText')
      }
      return this.$t('createUserDrawerButtonText')
    },
    titleText() {
      if (this.userIdUpdate != null && this.userIdUpdate !== undefined) {
        return this.$t('updateUserDrawerTitle')
      }
      return this.$t('createUserDrawerTitle')
    },
    descriptionText() {
      if (this.userIdUpdate != null && this.userIdUpdate !== undefined) {
        return this.$t('updateUserDrawerDescription')
      }
      return this.$t('createUserDrawerDescription')
    },
    disableEdit() {
      if (this.userIdUpdate != null && this.userIdUpdate !== undefined || this.csv !== null) {
        return true
      }
      return false
    },
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
  },

  watch: {
    plansChnagedWatcher(newValue, oldValue) {
      this.plansSetter()
    },
    userIdUpdate(newVal, oldVal) {
      if (newVal != null && newVal !== undefined) {
        this.plans = []
        this.fetchUserDetails()
      }
    },
    drawer(newVal, oldVal) {
      if (newVal === true && this.userIdUpdate == null) {
        this.plansSetter()
      }
      if (newVal === false && this.userIdUpdate != null) {
        this.resetForm()
        this.$store.dispatch('userEdit/setUserIdState', null)
      }
    },
  },
  created() {
    this.plansSetter()
  },
  methods: {
    submitForm() {
      let formValidated = false
      let csvPlanReaminingValidated = false
      let body = null
      if (this.csv === null) {
        formValidated = this.$refs.userName.validate(this.rules.required)
        formValidated =
          this.$refs.arabicUserName.validate(this.rules.required) &&
          formValidated
        formValidated =
          this.$refs.phoneNumber.validate(this.rules.required) && formValidated
        formValidated =
          this.$refs.email.validate(this.rules.email) && formValidated
        formValidated =
          this.$refs.city.validate(this.rules.required) && formValidated
        formValidated =
          this.$refs.plan.validate(this.rules.required) && formValidated
      } else {
        formValidated = this.$refs.plan.validate(this.rules.required)
        const planIndex = this.plans.findIndex((plan) => plan.id === this.plan)
        if (this.csv.length <= this.plans[planIndex].remaining) {
          csvPlanReaminingValidated = true
        } else {
          formValidated = false
          this.snackbar = true
        }
      }

      if (formValidated) {
        if (csvPlanReaminingValidated) {
          body = this.csv.map((item) => {
            return {
              status: 'inactive',
              name: item.englishName,
              arabic_name: item.arabicName,
              organisation: this.$store.getters['login/user'].id,
              plan: this.plan,
              phone_number: item.phonenumber,
              email: item.email,
              gender: item.gender,
              city: item.city,
              birth_of_date: item.dateOfBirth,
            }
          })

          body = JSON.stringify([...body])
        } else {
          body = JSON.stringify({
            status: 'inactive',
            name: this.userName,
            arabic_name: this.arabicUserName,
            organisation: this.$store.getters['login/user'].id,
            plan: this.plan,
            phone_number: this.phoneNumber,
            email: this.email,
            gender: this.gender,
            city: this.city,
            birth_of_date: this.date,
            // remaining: this.plans[planIndex].remaining - 1,
          })
        }

        if (this.userIdUpdate != null && this.userIdUpdate !== undefined) {
          this.updateRecord(body)
        } else {
          this.postRecord(body)
        }
      }
    },
    async postRecord(body) {
      const planIndex = this.organisationPlans.findIndex(
        (plan) => plan.plans_id === this.plan
      )
      await fetch(Api.users.AddUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['login/token'],
        },
        body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          if (response.ok) {
            return response.json()
          }
        })
        .then((data) => {
          if(this.csv === null){
          this.updatePlanAmount(
            this.organisationPlans[planIndex].id,
            this.organisationPlans[planIndex].active_amount + 1,
            this.organisationPlans[planIndex].remaining_amount - 1
          )
          }else{
            this.updatePlanAmount(
            this.organisationPlans[planIndex].id,
            this.organisationPlans[planIndex].active_amount + this.csv.length,
            this.organisationPlans[planIndex].remaining_amount - this.csv.length
          )
          }

          this.resetForm()
          this.$store.dispatch('plans/setPlans')
          this.$store.dispatch('plans/setPlansChanged')

          this.$emit('userAdded')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
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
            return response.json()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async plansSetter(planId) {
      await this.$store.dispatch('plans/setPlans')
      this.plans = []
      const result = this.$store.getters['plans/getPlans']

      for (const id in result) {
        if (result[id].remaining_amount > 0 || result[id].plans_id === planId) {
          this.addPlan(result[id].plans_id, result[id].remaining_amount)
        }
      }
    },
    async addPlan(id, remaining) {
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
            this.plans.push({
              id: data.data.id,
              name: data.data.arabic_name,
              remaining,
            })
          } else {
            this.plans.push({
              id: data.data.id,
              name: data.data.name,
              remaining,
            })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async fetchUserDetails() {
      await fetch(Api.users.GetSingleUser.replace('{id}', this.userIdUpdate), {
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
          const result = data.data
          this.userName = result.name
          this.arabicUserName = result.arabic_name
          this.gender = result.gender
          this.phoneNumber = result.phone_number
          this.email = result.email
          this.date = result.registered_date
          this.plan = result.plan
          this.tempPlan = result.plan
          this.plansSetter(result.plan)
          this.city = result.city
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async updateRecord(body) {
      await fetch(Api.users.PatchUser.replace('{id}', this.userIdUpdate), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters['login/token'],
        },
        body,
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((data) => {
          if (this.plan !== this.tempPlan) {
            this.reversePlans()
          }
          this.resetForm()
          this.$store.dispatch('plans/setPlans')
          this.$store.dispatch('plans/setPlansChanged')
          this.$emit('userAdded')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    async reversePlans() {
      const newPlanIndex = this.organisationPlans.findIndex(
        (plan) => plan.plans_id === this.plan
      )
      const oldPlanIndex = this.organisationPlans.findIndex(
        (plan) => plan.plans_id === this.tempPlan
      )

      const newPlanDetails = {
        id: this.organisationPlans[newPlanIndex].id,
        activeAmount: this.organisationPlans[newPlanIndex].active_amount + 1,
        remainingAmount:
          this.organisationPlans[newPlanIndex].remaining_amount - 1,
      }
      const oldPlanDetails = {
        id: this.organisationPlans[oldPlanIndex].id,
        activeAmount: this.organisationPlans[oldPlanIndex].active_amount - 1,
        remainingAmount:
          this.organisationPlans[oldPlanIndex].remaining_amount + 1,
      }

      await this.updatePlanAmount(
        newPlanDetails.id,
        newPlanDetails.activeAmount,
        newPlanDetails.remainingAmount
      )
      await this.updatePlanAmount(
        oldPlanDetails.id,
        oldPlanDetails.activeAmount,
        oldPlanDetails.remainingAmount
      )

      await this.$store.dispatch('plans/setPlans')
      await this.$store.dispatch('plans/setPlansChanged')
    },
    resetForm() {
      this.$refs.userName.reset()
      this.$refs.arabicUserName.reset()
      this.$refs.phoneNumber.reset()
      this.$refs.email.reset()
      this.$refs.city.reset()
      this.$refs.plan.reset()
      this.tempPlan = null
      this.csv = null
    },
  },
}
</script>
<style lang="scss" scoped>
.v-navigation-drawer {
  padding: 40px;
  min-width: 544px;
}
.user-title {
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
}
.user-description {
  // font-family: 'Roboto';
  line-height: 20px;
  margin-top: 6px;
  color: #687b9e;
}
.add-title {
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  margin-top: 16px;
}
.v-input:deep(.v-messages__message) {
  line-height: unset;
}
.gender-title {
  font-weight: 600;
  line-height: 19px;
}
.v-input--selection-controls {
  margin-top: 0;
}
.margin-radio {
  margin-left: auto;
  margin-right: auto !important;
}
.vue-csv-uploader:deep(.csv-mapping-table) {
  .form-control {
    -webkit-appearance: auto;
    border-style: outset;
    margin: 5px 4px;
  }
}
</style>
