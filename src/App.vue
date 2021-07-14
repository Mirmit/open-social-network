<template>
  <ion-app>
    <the-header></the-header>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from "./components/layouts/TheHeader";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    TheHeader
  }
});
</script>
