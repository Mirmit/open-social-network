<template>
  <ion-row class="ion-justify-content-center">
      <ion-col size="3">
        <ion-avatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
        </ion-avatar>
        <ion-label>{{ username }}</ion-label>
      </ion-col>
  </ion-row>
</template>

<script>
import { IonAvatar, IonLabel, IonCol, IonRow } from "@ionic/vue";

export default {
  name: "ActionButton",
  components: {
    IonAvatar,
    IonLabel,
    IonCol,
    IonRow
  },
  props: {
    username: String
  }
}
</script>

<style scoped>
ion-row {
  margin-top: 20px;
}

</style>
