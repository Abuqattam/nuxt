<template>
  <div class="layout-container">
    <NavBar />
    <section class="flex-grow-1">
      <!-- eslint-disable vue/no-v-html -->
      <v-container class="privacy-container">
        <v-row>
          <v-col>
            <span v-html="privacyPolicy"></span>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <Footer />
  </div>
</template>

<script>
import Api from '../../services/Api'
import NavBar from '../../components/layouts/NavBar.vue'
import Footer from '../../components/layouts/Footer.vue'

export default {
  name: 'PrivacyPolicy',
  components: {
    NavBar,
    Footer,
  },

  data() {
    return {
      privacyPolicies: {
        english: '',
        arabic: '',
      },
    }
  },
  async fetch() {
    const url = Api.privacyPolicy.GetAll

    await fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.statusText)
        }
      })
      .then((data) => {
        this.privacyPolicies = data.data
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  computed: {
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
    privacyPolicy() {
      if (this.arabicLanguage) {
        return this.privacyPolicies.arabic
      } else {
        return this.privacyPolicies.english
      }
    },
  },
  watch: {},

  methods: {},
}
</script>
<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.privacy-container{
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
