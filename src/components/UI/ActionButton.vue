<template>
  <ion-button @click="$emit('customClick')">Beat</ion-button>
</template>

<script>
import { IonButton } from "@ionic/vue";

export default {
  name: "ActionButton",
  components: {
    IonButton
  },
  emits: [ 'customClick']
}
</script>

<style scoped>

</style>
