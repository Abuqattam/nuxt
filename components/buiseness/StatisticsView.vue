<template>
  <v-row no-gutters class="cards-row-body">
    <statistics-card
      v-for="item in statisticCards"
      :key="item.title"
      :title="item.title"
      :icon-path="item.iconPath"
      :value="item.value"
    ></statistics-card>
  </v-row>
</template>

<script>
import Api from '../../services/Api'
import StatisticsCard from './StatisticsCard.vue'

export default {
  name: 'StatisticsView',
  components: {
    StatisticsCard,
  },

  data() {
    return {
      showDrawer: false,
      tableUpdate: false,
      statisticCards: [
        {
          title: this.$t('active'),
          iconPath: require('../../assets/images/business/active-users-icon.png'),
          value: 200,
        },
        {
          title: this.$t('remaining'),
          iconPath: require('../../assets/images/business/remaining-users-icon.png'),
          value: 200,
        },
        {
          title: this.$t('totalSavings'),
          iconPath: require('../../assets/images/business/total-savings-icon.png'),
          value: 400,
        },
        {
          title: this.$t('totalCoupons'),
          iconPath: require('../../assets/images/business/total-coupons-icon.png'),
          value: 19,
        },
      ],
    }
  },
  async fetch() {
    await fetch(Api.users.GetUsersTotalSavings, {
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
        const obj = data.data[0].sum
        this.statisticCards[2].value = obj[Object.keys(obj)[0]]
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })

    await fetch(Api.users.GetUsersTotalCoupons, {
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
        const obj = data.data[0].sum
        this.statisticCards[3].value = obj[Object.keys(obj)[0]]
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  computed: {
    organisationPlans() {
      return this.$store.getters['plans/getPlans']
    },
  },
  watch: {
    organisationPlans(newValue, oldValue) {
      this.activeAmount()
      this.remainingAmount()
    },
  },
  /// this call on created can be removed
  created() {
    this.activeAmount()
    this.remainingAmount()
  },
  methods: {
    activeAmount() {
      let active = 0
      for (const id in this.organisationPlans) {
        active = active + this.organisationPlans[id].active_amount
      }
      this.statisticCards[0].value = active
    },
    remainingAmount() {
      let reamining = 0
      for (const id in this.organisationPlans) {
        reamining = reamining + this.organisationPlans[id].remaining_amount
      }
      this.statisticCards[1].value = reamining
    },
  },
}
</script>
<style lang="scss" scoped>
.cards-row-body {
  margin-top: 62px;
}
</style>
