<template>
  <ion-button @click="$emit('customClick')">{{ buttonName }}</ion-button>
</template>

<script>
import { IonButton } from "@ionic/vue";

export default {
  name: "ActionButton",
  components: {
    IonButton
  },
  emits: [ 'customClick'],
  props: {
    'buttonName': String
  }
}
</script>

<style scoped>

</style>
