<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: 'SERVICENAME', path: '/services/ID' }]"
        current-page="SERVICENAME Team"
      />
      <!-- Grid of people -->
      <grid :featured-element="projectManager" :elements="assistance" />
    </section>
  </main>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import Grid from '~/components/grids/Grid.vue'
export default {
  components: {
    Breadcrumb,
    Grid,
  },
  async asyncData({ $axios, route }) {
    // fetch people from the database
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/people/${id}`
    ) // TODO: missing api
    const projectManager = {
      heading: data.pm.name + ' ' + data.pm.surname,
      image: data.pm.image,
      destinationLink: '/people/' + data.pm.id + '?route=1',
      subheading: data.pm.position,
    }
    const assistance = []
    data.assistance.forEach(function (assistant) {
      assistance.push({
        image: assistant.image,
        heading: assistant.name + ' ' + assistant.surname,
        destinationLink: '/people/' + assistant.id + '?route=1',
        subheading: assistant.position,
      })
    })
    return {
      projectManager,
      assistance,
    }
  },
}
</script>

<style scoped></style>
