<template>
  <main class="page-container">
    <section class="section-container error-messages">
      <h1><span class="mdi mdi-alert-circle"></span><br />An error occurred</h1>
      <p>{{ $route.query.err }}</p>
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

<style scoped></style>
