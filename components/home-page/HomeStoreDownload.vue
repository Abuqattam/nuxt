<template>
  <div
    class="store-section"
    :class="arabicLanguage ? 'store-section-ar' : 'store-section-en'"
  >
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12" lg="6" xl="6">
          <div class="store-data">
            <h3>{{ getTitle }}</h3>
            <p>
              {{ getSubTitle }}
            </p>
            <div>
              <a
                v-if="storePage.appStoreLink"
                target="_blank"
                :href="storePage.appStoreLink"
              >
                <img src="../../assets/images/app-store.png" alt="" />
              </a>
              <a v-else href="#">
                <img src="../../assets/images/app-store.png" alt="" />
              </a>
              <a
                v-if="storePage.googlePlayLink"
                target="_blank"
                :href="storePage.googlePlayLink"
              >
                <img src="../../assets/images/google-play.png" alt="" />
              </a>
              <a v-else href="#">
                <img src="../../assets/images/google-play.png" alt="" />
              </a>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="6" xl="6">
          <div
            class="store-img"
            :class="!arabicLanguage ? 'store-img-english' : ''"
          >
            <img src="../../assets/images/mocup.png" alt="" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from '../../services/Api'
export default {
  name: 'HomeStoreDownload',
  data() {
    return {
      storePage: {
        arabicTitle: '',
        arabicSubTitle: '',
        englishTitle: '',
        englishSubTitle: '',
        googlePlayLink: '#',
        appStoreLink: '#',
      },
    }
  },
  async fetch() {
    await fetch(Api.homePage.GetStorePage)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        this.storePage = {
          arabicTitle: data.data.arabic_title,
          arabicSubTitle: data.data.arabic_sub_title,
          englishTitle: data.data.english_title,
          englishSubTitle: data.data.english_sub_title,
          googlePlayLink: data.data.google_play_link,
          appStoreLink: data.data.app_store_link,
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
        return this.storePage.arabicTitle
      } else {
        return this.storePage.englishTitle
      }
    },
    getSubTitle(){
      if (this.arabicLanguage) {
        return this.storePage.arabicSubTitle
      } else {
        return this.storePage.englishSubTitle
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.store-section {
  padding: 60px 0;
  background-image: url(../../assets/images/apps-bg.jpg);
  background-position: center;
  background-size: cover;
}
.store-section-ar {
  background-image: url(../../assets/images/apps-bg.jpg);
}
.store-section-en {
  background-image: url(../../assets/images/apps-bg-fliped.jpg);
}

.store-section .row {
  align-items: center;
}

.store-data h3 {
  font-size: 28px;
  font-family: 'ge-bold';
  color: #34125b;
  margin-bottom: 10px;
}

.store-data p {
  font-family: 'ge-medium';
  margin-bottom: 35px;
}

.store-data div {
  display: flex;
  align-items: center;
  column-gap: 10px;
  row-gap: 10px;
}

.store-data div a {
  transition: 0.3s;
}

.store-data div a:hover {
  transform: scale(0.95);
}

.store-img {
  margin-bottom: -165px;
}
.store-img-english {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
