<template>
  <main class="page-container">
    <section class="section-container error-messages">
      <h1>Page Not Found</h1>
      <p>We can't find the page you are looking for.</p>
      <base-button
        label="Go to the homepage"
        icon="mdi mdi-home-variant"
        @click.native="navigateTo('/')"
      />
    </section>
  </main>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: { BaseButton },
  mixins: [RoutingMixins],
  head() {
    return {
      title: 'Plug-IT | Error',
    }
  },
}
</script>

<style scoped>
.error-messages {
  text-align: center;
  margin-top: 30vh;
}
</style>
