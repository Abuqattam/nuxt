<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="getShow" max-width="290">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold ">
            {{$t('deleteUserTitle')}}
          </v-card-title>
          <v-card-text class="mt-4">
            {{$t('deleteUserBodyText')}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="confirmPopUp()"> {{$t('deleteUserButtonText')}} </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ConfirmPopUp',
  components: {},
  props: {
    popUp: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['close','confirm'],
  data() {
    return {}
  },
  computed: {
    getShow: {
      get() {
        return this.popUp
      },
      set(newValue) {
        if (newValue === false) this.$emit('close')
      },
    },
  },
  methods: {
    confirmPopUp() {
      this.$emit('confirm')
    },
  },
}
</script>
<style lang="scss" scoped>
.v-card:deep(.v-card__title) {
  justify-content: center;
}
.v-card{
  font-family: NotoIKEAArabic-regular;
}
.text-h5{
  font-family: NotoIKEAArabic-bold !important;
}
.v-btn{
  letter-spacing: 0;
}
</style>
