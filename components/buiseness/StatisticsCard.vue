<template>
  <v-card
    class="statistics-card-body"
    :class="arabicLanguage ? 'statistics-card-body-ar' : ''"
  >
    <p class="card-title" :class="arabicLanguage ? 'card-title-ar' : ''">
      {{ title }}
    </p>
    <div class="d-flex align-center">
      <v-img
        class="card-icon"
        :class="arabicLanguage ? 'card-icon-ar' : ''"
        :src="iconPath"
      ></v-img>
      <p class="card-icon-number">{{ value }}</p>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'StatisticsCard',
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    iconPath: {
      type: String,
      default: '',
      required: true,
    },
    value: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    arabicLanguage() {
      if (this.$i18n.locale === 'ar') {
        return true
      }
      return false
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.statistics-card-body {
  width: 240px;
  height: 163px;
  margin-left: 23px;
  margin-top: 23px;

  .card-title {
    margin: 20px 0 20px 28px;
    // font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
  }
  .card-icon {
    margin: 0 16px 0 20px;
    max-width: 60px;
    max-height: 60px;
    border-radius: 6px;
  }
  .card-icon-number {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 37px;
    line-height: 43px;
    color: #223354;
    margin-bottom: 0;
  }
}
.statistics-card-body-ar {
  margin-left: unset;
  margin-right: 23px;

  .card-title-ar {
    margin: 20px 28px 20px 0;
  }
  .card-icon-ar {
    margin: 0 20px 0 16px;
  }
}
</style>
