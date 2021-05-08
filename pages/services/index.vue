<template>
  <main class="page-container">
    <!-- FILTERING OPTIONS -->
    <section class="section-container">
      <breadcrumb current-page="Our Services" />
      <select-filter @filter-change="filterByArea" />
    </section>
    <hr />

    <!-- SERVICE RESULTS -->
    <section class="section-container">
      <!-- Grid of services -->
      <grid v-if="matchCounter > 0" :elements="services" />

      <!-- Loading message -->
      <p v-else class="loading">
        <span class="mdi mdi-progress-clock"></span>
        No service found
      </p>
    </section>
  </main>
</template>

<script>
import Grid from '~/components/grids/Grid.vue'
export default {
  components: {
    Grid,
  },
  async asyncData({ $axios, redirect }) {
    // fetch the services from the database
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/services`)
    if (data === null || data.length === 0) {
      return redirect(
        '/error?err=Failed to retrieve sercives data. Try again later.'
      )
    }

    // parameters required by the breadcrumb component of the destination page
    const fromServicesToArea = '?route=4'

    // convert the fetched data into the format required by the components
    const fetchedServices = []
    data.forEach(function (service) {
      fetchedServices.push({
        image: service.icon,
        heading: service.name,
        destinationLink: '/services/' + service.id,
        subheading: service.areaName,
        subheadingLink: '/areas/' + service.areaName + fromServicesToArea,
        summary: service.slogan,
        area: service.areaName, // additional property fot filtering purposes
      })
    })
    return {
      fetchedServices,
    }
  },
  data() {
    return {
      // Default option for area
      selectedArea: 'All',
    }
  },
  computed: {
    // Compute the services to be shown based on the selected area
    services() {
      if (this.fetchedServices === undefined) return []
      return this.fetchedServices.filter(
        (ev) => this.selectedArea === ev.area || this.selectedArea === 'All'
      )
    },

    // Compute the number of showed services
    matchCounter() {
      return this.services.length
    },
  },
  methods: {
    // Change the area filter option
    filterByArea(chosenValue) {
      this.selectedArea = chosenValue
    },
  },
}
</script>

<style scoped>
/* Appearance of the loading message */
.loading {
  text-align: center;
  margin-top: 20vh;
}
</style>
