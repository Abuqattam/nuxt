<template>
  <div class="layout-container">
    <NavBar />
    <section class="flex-grow-1">
      <!-- eslint-disable vue/no-v-html -->
      <v-container class="privacy-container">
        <v-row>
          <v-col>
            <span v-html="getTerms"></span>
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
  name: 'TermsAndConditions',
  components: {
    NavBar,
    Footer,
  },

  data() {
    return {
      terms: {
        english: '',
        arabic: '',
      },
    }
  },
  async fetch() {
    const url = Api.termsAndCondition.GetAll

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
        this.terms = data.data
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
    getTerms() {
      if (this.arabicLanguage) {
        return this.terms.arabic
      } else {
        return this.terms.english
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
