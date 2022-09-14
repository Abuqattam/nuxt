<template>
  <div>
    <v-carousel
      v-model="model"
      :show-arrows="false"
      :hide-delimiter-background="true"
      :class="arabicLanguage ? 'arabic-carousel' : ''"
    >
      <!-- :cycle="true"
      interval="3000" -->
      <v-carousel-item
        v-for="slider in sliders"
        :key="slider.id"
        :src="slider.image"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-container v-if="getTitle || getSubTitle">
          <h3>{{ getTitle }}</h3>
          <p>{{ getSubTitle }}</p>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import Api from '../../services/Api'
export default {
  name: 'HomeCarousel',
  data() {
    return {
      model: 0,
      sliders: [{}],
    }
  },
  async fetch() {
    await fetch(Api.imageSlider.GetAll)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        this.sliders = []
        if (data.data.length > 0) {
          const result = data.data.map((item) => {
            item.image = Api.localFiles + item.image
            return item
          })
          this.sliders = result
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
        return this.sliders[this.model].arabic_title
      } else {
        return this.sliders[this.model].english_title
      }
    },
    getSubTitle(){
      if (this.arabicLanguage) {
        return this.sliders[this.model].arabic_sub_title
      } else {
        return this.sliders[this.model].english_sub_title
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.v-carousel:deep(.v-btn--active::before) {
  opacity: 0;
}
.v-carousel:deep(.v-btn:hover::before) {
  opacity: 0;
}
.v-carousel:deep(.v-carousel__controls__item:hover .v-icon) {
  opacity: 0.5;
}
.v-carousel:deep(.v-btn--active) {
  color: #faed34;
}

.v-carousel:deep(.v-responsive__content .container) {
  margin: 0 !important;
  position: absolute;
  width: 100% !important;
  top: 50%;
  transform: translateY(-50%);
}
.arabic-carousel:deep(.v-responsive__content .container) {
  right: 0;
  text-align: right;
}

.v-responsive__content h3 {
  font-size: 36px;
  color: #fff;
  font-family: ge-bold;
}

.v-responsive__content p {
  font-size: 20px;
  font-family: ge-medium;
  color: #fff;
}
</style>
