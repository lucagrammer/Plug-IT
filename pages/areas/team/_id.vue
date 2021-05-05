<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: 'AREANAME', path: '/areas/ID' }]"
        current-page="AREANAME Team"
      />
      <!-- Grid of people -->
      <grid :featured-element="responsible" :elements="employees" />
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
    const responsible = {
      heading: data.responsible.name + ' ' + data.responsible.surname,
      image: data.responsible.image,
      destinationLink: '/people/' + data.responsible.id + '?route=1',
      subheading: data.responsible.position,
    }
    const employees = []
    data.assistance.forEach(function (employee) {
      employees.push({
        image: employee.image,
        heading: employee.name + ' ' + employee.surname,
        destinationLink: '/people/' + employee.id + '?route=1',
        subheading: employee.position,
      })
    })
    return {
      responsible,
      employees,
    }
  },
}
</script>

<style scoped></style>
