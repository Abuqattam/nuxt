<template>
  <div class="about-section">
    <v-container>
      <h3>{{ getTitle }}</h3>
      <p>
        {{ getSubTitle }}
      </p>
    </v-container>
  </div>
</template>

<script>
import Api from '../../services/Api'
export default {
  name: 'HomeAbout',
  data() {
    return {
      aboutUs: {
        arabic_title: '',
        arabic_description: '',
        english_title: '',
        english_description: '',
      },
    }
  },
  async fetch() {
    await fetch(Api.homePage.GetAboutUs)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        if (data.data) {
          this.aboutUs = data.data
        }
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
    getTitle(){
      if (this.arabicLanguage) {
        return this.aboutUs.arabic_title
      } else {
        return this.aboutUs.english_title
      }
    },
    getSubTitle(){
      if (this.arabicLanguage) {
        return this.aboutUs.arabic_description
      } else {
        return this.aboutUs.english_description
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.about-section {
  padding: 45px 0;
  text-align: center;
  position: relative;
  z-index: 1;
}

.about-section::before {
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

.about-section h3 {
  font-family: ge-bold;
  font-size: 28px;
  margin-bottom: 10px;
}

.about-section p {
  font-size: 16px;
  font-family: ge-medium;
  margin: 0 auto;
  max-width: 80%;
}
</style>
