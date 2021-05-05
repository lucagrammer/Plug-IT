<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb current-page="Areas" />
      <!-- Grid of areas -->
      <grid :elements="areas" />
    </section>
  </main>
</template>

<script>
import Grid from '~/components/grids/Grid.vue'
export default {
  components: {
    Grid,
  },
  async asyncData({ $axios }) {
    // fetch the services from the database
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    const areas = []
    data.forEach(function (area) {
      areas.push({
        image: area.image1,
        heading: area.name,
        destinationLink: '/areas/' + area.id,
        summary: area.overview,
      })
    })
    return {
      areas,
    }
  },
}
</script>

<style scoped></style>
