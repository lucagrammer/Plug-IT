<template>
  <main class="page-container">
    <section class="section-container">
      <h1>Our Services</h1>
    </section>
    <hr />
    <section class="section-container">
      <grid :elements="services" />
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
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/services`)
    const services = []
    data.forEach(function (service) {
      services.push({
        image: service.image1,
        heading: service.name,
        destinationLink: '/services/' + service.id,
        subheading: service.areaName,
        subheadingLink: '/areas/' + service.areaName,
        summary: service.paragraph1,
      })
    })
    return {
      services,
    }
  },
  data() {
    return {
      //  adUrl: '',
    }
  },
  methods: {
    goToService(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped></style>
