<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb current-page="Areas" />

      <!-- GRID OF AREAS -->
      <grid :elements="areas" />
    </section>
  </main>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import Grid from '~/components/grids/Grid.vue'
export default {
  components: {
    Grid,
    Breadcrumb,
  },
  async asyncData({ $axios, redirect }) {
    // fetch the areas from the database
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/areas`)
    if (data === null || data.length === 0) {
      return redirect(
        '/error?err=Failed to retrieve areas data. Try again later.'
      )
    }

    // convert the fetched data into the format required by the components
    const areas = []
    data.forEach(function (area) {
      areas.push({
        image: area.icon,
        heading: area.name,
        destinationLink: '/areas/' + area.name,
        summary: area.overview,
      })
    })
    return {
      areas,
    }
  },
  head() {
    return {
      title: 'Plug-IT | Areas',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A brief overview of the areas in which Plug-IT operates: Internet of Things, Security, Business Management, Education and Artificial Intelligence. ',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
