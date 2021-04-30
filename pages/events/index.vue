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
// import axios from 'axios'
import Grid from '~/components/grids/Grid.vue'
export default {
  components: {
    Grid,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/events`)
    const events = []
    data.forEach(function (event) {
      events.push({
        image: event.image,
        heading: event.title,
        destinationLink: '/events/' + event.id,
        subheading: event.areaName,
        subheadingLink: '/areas/' + event.areaName,
        label: event.date + ' ' + event.time,
        summary: event.overview,
      })
    })
    return {
      events,
    }
  },
  data() {
    return {
      //  adUrl: '',
    }
  },
  methods: {
    goToEvent(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped></style>
