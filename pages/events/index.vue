<template>
  <main class="page-container">
    <section class="section-container">
      <h1>Events</h1>
    </section>
    <hr />
    <section class="section-container">
      <grid :elements="events" />
    </section>
    <hr />
  </main>
</template>

<script>
import axios from 'axios'
import Grid from '~/components/grids/Grid.vue'
export default {
  components: {
    Grid,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/events`)
    const events = data
    return {
      events,
    }
  },
  data() {
    return {
      adUrl: '',
    }
  },
  mounted() {
    setTimeout(async () => {
      const { data } = await axios.get('/api/ad')
      this.adUrl = data.url
    }, 1000)
  },
  methods: {
    goToEvent(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped></style>
