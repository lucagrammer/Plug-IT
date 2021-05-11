<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: areaName, path: '/areas/' + areaName }]"
        :current-page="areaName + ' Team'"
      />

      <!-- GRID OF PEOPLE -->
      <grid :featured-element="responsible" :elements="workers" />
    </section>
  </main>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import Grid from '~/components/grids/Grid.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    Breadcrumb,
    Grid,
  },
  mixins: [RoutingMixins],
  async asyncData({ $axios, route, redirect }) {
    const areaName = route.params.id

    // fetch people from the database
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/areateam/${areaName}`
    )
    if (data === null) {
      return redirect('/error?err=The area you are looking for does not exist.')
    }

    // parameters required by the breadcrumb component of the destination page
    const fromTeamToPeople = '?route=0&area=' + areaName

    // convert the fetched data into the format required by the components
    const responsible = {
      heading:
        data.area_responsible[0].name + ' ' + data.area_responsible[0].surname,
      image: data.area_responsible[0].image,
      destinationLink:
        '/people/' + data.area_responsible[0].id + fromTeamToPeople,
      subheading: 'Area Responsible',
    }
    const workers = []
    data.workers.forEach(function (worker) {
      workers.push({
        image: worker.image,
        heading: worker.name + ' ' + worker.surname,
        destinationLink: '/people/' + worker.id + fromTeamToPeople,
        subheading: worker.position,
      })
    })
    return {
      responsible,
      workers,
    }
  },
  data() {
    return {
      // The name of the area
      areaName: this.$route.params.id,
    }
  },
  head() {
    return {
      title: 'Plug-IT | ' + this.areaName + ' Team',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A brief overview of the people composing the team working on ' +
            this.areaName +
            ' at Plug-IT.',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
