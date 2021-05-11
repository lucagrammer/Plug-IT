<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[
          { title: serviceName, path: '/services/' + serviceID },
        ]"
        :current-page="serviceName + ' Team'"
      />

      <!-- GRID OF PEOPLE -->
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
  async asyncData({ $axios, route, redirect }) {
    const serviceID = route.params.id

    // fetch people from the database
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/serviceteam/${serviceID}`
    )
    if (data === null) {
      return redirect(
        '/error?err=The service you are looking for does not exist.'
      )
    }

    // parameters required by the breadcrumb component of the destination page
    const fromTeamToPeople =
      '?route=1&sID=' + serviceID + '&service=' + data.name.replace('+', '%2b')

    // convert the fetched data into the format required by the components
    const projectManager = {
      heading: data.pm.name + ' ' + data.pm.surname,
      image: data.pm.image,
      destinationLink: '/people/' + data.pm.id + fromTeamToPeople,
      subheading: 'Project Manager',
    }
    const assistance = []
    data.assistants.forEach(function (assistant) {
      assistance.push({
        image: assistant.image,
        heading: assistant.name + ' ' + assistant.surname,
        destinationLink: '/people/' + assistant.id + fromTeamToPeople,
        subheading: assistant.position,
      })
    })
    return {
      serviceID,
      serviceName: data.name,
      projectManager,
      assistance,
    }
  },
  head() {
    return {
      title: 'Plug-IT | ' + this.serviceName + ' Team',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A brief overview of the people composing the team working on ' +
            this.serviceName +
            'service at Plug-IT.',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
