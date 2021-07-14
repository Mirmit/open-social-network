<template>
  <ion-app>
    <ion-header>
      <the-header></the-header>
    </ion-header>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonHeader, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from "./components/layouts/TheHeader";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    TheHeader,
    IonHeader,
    IonContent
  }
});
</script>
