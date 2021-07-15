<template>
  <ion-buttons>
    <ion-col>
      <ion-button router-link="/myBeats" expand="full" :class="isActive('/myBeats')">
        <ion-label>My Beats</ion-label>
      </ion-button>
    </ion-col>
    <ion-col>
      <ion-button router-link="/myWall" expand="full" :class="isActive('/myWall')">
        <ion-label>My Wall</ion-label>
      </ion-button>
    </ion-col>
    <ion-col>
      <ion-button router-link="/discover" expand="full" :class="isActive('/discover')">
        <ion-label>Discover</ion-label>
      </ion-button>
    </ion-col>
  </ion-buttons>
</template>

<script>
import { IonButton, IonButtons, IonCol, IonLabel } from "@ionic/vue";
import { useRoute } from "vue-router";

export default {
  name: "TheTabs",
  components: {
    IonButton,
    IonButtons,
    IonCol,
    IonLabel
  },
  methods: {
    isActive: function (link) {
      const route = useRoute();
      return { active: link === route.fullPath };
    }
  }
}
</script>

<style scoped>
.active {
  color: var(--ion-color-primary);
}
</style>
