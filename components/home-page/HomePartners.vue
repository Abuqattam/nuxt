<template>
  <div class="partners-section">
    <v-container>
      <div class="partners-head">
        <h3>{{ getTitle }}</h3>
        <p>
          {{ getSubTitle }}
        </p>
      </div>
      <v-row no-gutters>
        <div
          v-for="partner in partnersPage.partners"
          :key="partner.id"
          class="partner-item"
        >
          <img :src="partner.partnerLogo" alt="" />
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from '../../services/Api'
export default {
  name: 'HomePartners',
  data() {
    return {
      partnersPage: {
        id: 0,
        english_title: '',
        english_sub_title: '',
        arabic_title: '',
        arabic_sub_title: '',
        partners: [
          {
            id: 0,
            partnerLogo: '',
            partnerName: '',
            sort: null,
          },
        ],
      },
    }
  },
  async fetch() {
    await fetch(Api.homePage.GetPartnersPage)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        this.partnersPage = {
          id: data.data.id,
          english_title: data.data.english_title,
          english_sub_title: data.data.english_sub_title,
          arabic_title: data.data.arabic_title,
          arabic_sub_title: data.data.arabic_sub_title,
          partners: data.data.partners.map((x) => {
            return {
              id: x.id,
              partnerLogo: Api.localFiles + x.partner_logo,
              partnerLame: x.partner_name,
              sort: x.sort,
            }
          }),
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
        return this.partnersPage.arabic_title
      } else {
        return this.partnersPage.english_title
      }
    },
    getSubTitle(){
      if (this.arabicLanguage) {
        return this.partnersPage.arabic_sub_title
      } else {
        return this.partnersPage.english_sub_title
      }
    },
  },
}
</script>
<style lang="scss" scoped>
* {
  font-family: ge-light;
}
.partners-section {
  position: relative;
  z-index: 1;
  background-color: #abafaf;
  padding: 60px 0;
}

.partners-section::before {
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

.partners-head {
  text-align: center;
  margin-bottom: 50px;
}

.partners-head h3 {
  font-family: ge-bold;
  font-size: 28px;
  margin-bottom: 10px;
  color: #fff;
}

.partners-head p {
  font-size: 16px;
  font-family: ge-medium;
  margin: 0 auto;
  max-width: 80%;
  color: #fff;
}

.partners-section .row {
  align-items: center;
  justify-content: center;
  row-gap: 48px;
  column-gap: 40px;
}

.partners-section .partner-item {
  width: 17%;
  position: relative;
  border-radius: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.partners-section .partner-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50px;
}

.partners-section .partner-item::before {
  content: '';
  position: absolute;
  right: -10px;
  top: -10px;
  width: 50%;
  height: 100%;
  border-radius: 0 50px 50px 0;
  background: #faed34;
  z-index: -1;
}
</style>
