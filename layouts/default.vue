<template>
  <v-app dark>
    <v-main>
      <!-- <div v-show="$store.state.loader"> -->
      <div v-show="loader">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      dialog: true,
    }
  },
  computed: {
    loader(){
      return this.$store.getters['loader/getLoader']
    },
  },
}
</script>
<style lang="scss" scoped>
.v-progress-circular {
  position: fixed;
  margin-left: 50%;
  margin-right: 50%;
  z-index: 99999;
  height: 100% !important;
}
</style>
