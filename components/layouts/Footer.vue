<template>
  <footer>
    <div class="footer-top">
      <v-container>
        <h4>{{$t('dealStation')}}</h4>
        <section>
          <v-row no-gutters>
            <nuxt-link
              :to="localePath({ name: 'privacyPolicy' })"
              class="white--text"
              >{{$t('privacyPolicyLinkText')}}</nuxt-link
            >
            <nuxt-link
              :to="localePath({ name: 'termsAndConditions' })"
              class="mx-2 white--text"
              >{{$t('termsAndConditionsLinkText')}}</nuxt-link
            >
          </v-row>
        </section>
      </v-container>
    </div>
    <div class="footer-bottom">
      <v-container>
        <v-row no-gutters>
          <p class="ma-4">
            {{ $t('copyRights') }}
            <a
              target="_blank"
              class="white--text"
              href="https://www.mash.world/"
            >
              Mash World
            </a>
            © 2022
          </p>
          <!-- <p>جميع الحقوق محفوظة ٢٠٢٢</p> -->
          <div class="socials">
            <a
              v-if="socials.instagram"
              target="_blank"
              :href="socials.instagram"
            >
              <i class="la la-instagram"></i>
            </a>
            <a v-if="socials.twitter" target="_blank" :href="socials.twitter">
              <i class="la la-twitter"></i>
            </a>
            <a v-if="socials.facebook" target="_blank" :href="socials.facebook">
              <i class="la la-facebook"></i>
            </a>
          </div>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

<script>
import Api from '../../services/Api'
export default {
  name: 'MainFooter',
  data() {
    return {
      socials: {
        instagram: null,
        twitter: null,
        facebook: null,
      },
    }
  },
  async fetch() {
    await fetch(Api.footer.GetFooterData)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        const result = data.data
        this.socials = {
          instagram: result.instagram_link,
          twitter: result.twitter_link,
          facebook: result.facebook_link,
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
  },
}
</script>
<style lang="scss" scoped>
footer {
  background-color: #c1c6c8;
}

.footer-top {
  // padding: 90px 0 45px;
  padding-top: 90px;
}
.footer-top a:hover {
  transform: scale(0.9);
  text-decoration: underline;
  color: blue !important;
}

.footer-top h4 {
  font-size: 28px;
  color: #fff;
  font-family: 'ge-bold';
  margin-bottom: 45px;
}

.footer-bottom .container {
  border-top: 1px solid #fff;
  padding: 30px 0;
}

.footer-bottom p {
  color: #fff;
  font-family: NotoIKEAArabic-bold;
  // font-family: 'ge-medium';
  font-size: 14px;
  margin: 0;
}

.footer-bottom .row {
  justify-content: space-between;
}

.footer-bottom .socials {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.footer-bottom .socials a {
  font-size: 20px;
  color: #fff;
}

.footer-bottom .socials a i {
  color: inherit;
  font-size: inherit;
  line-height: 1;
}
</style>
