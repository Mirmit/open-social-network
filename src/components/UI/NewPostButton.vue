<template>
  <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button color="secondary" @click="$emit('customClick')">
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonIcon, IonFabButton } from "@ionic/vue";

export default {
  name: "NewPostButton",
  components: {
    IonFab,
    IonIcon,
    IonFabButton
  },
  emits: ['customClick']
}
</script>

<style scoped>

</style>
