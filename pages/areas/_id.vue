<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: 'Areas', path: '/areas/' }]"
        :alt-routes="[
          [
            {
              title: personName,
              path: '/people/' + personID + '/',
            },
          ],
          [
            {
              title: eventName,
              path: '/events/' + eventID + '/',
            },
          ],
          [{ title: 'Events', path: '/events/' }],
          [
            {
              title: serviceName,
              path: '/services/' + serviceID + '/',
            },
          ],
          [{ title: 'Our Services', path: '/services/' }],
        ]"
        :current-page="areaName"
      />

      <!-- AREA PARAGRAPH 1 -->
      <paragraph :image="image1" :image-cap="imageCap1" position="right">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="paragraph1"></div>
      </paragraph>

      <!-- AREA PARAGRAPH 2 -->
      <paragraph :image="image2" :image-cap="imageCap2" position="left">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="paragraph2"></div>
        <base-button
          :label="'Discover our ' + areaName + ' Team'"
          icon="mdi mdi-account-group"
          @click.native="navigateTo('/areas/team/' + areaName + '/')"
        />
      </paragraph>
    </section>
    <hr />

    <!-- GRID OF SERVICES -->
    <section class="section-container">
      <h2>Our {{ areaName }} Services</h2>
      <grid :elements="services" />
    </section>
  </main>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'
import Grid from '~/components/grids/Grid.vue'
import Paragraph from '~/components/Paragraph.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    BaseButton,
    Paragraph,
    Grid,
    Breadcrumb,
  },
  mixins: [RoutingMixins],
  async asyncData({ $axios, route, redirect }) {
    const areaName = route.params.id

    // fetch the info from the database
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/area/${areaName}`
    )
    if (data === null) {
      return redirect(
        '/error/?err=The area you are looking for does not exist.'
      )
    }

    // parameters required by the breadcrumb component of the destination page
    const fromAreaToService = '/?route=0&area=' + areaName

    // convert the fetched data into the format required by the components
    const services = []
    data.services.forEach(function (service) {
      services.push({
        image: service.icon,
        heading: service.name,
        destinationLink: '/services/' + service.id + fromAreaToService,
        summary: service.slogan,
      })
    })
    return {
      overview: data.overview,
      image1: data.image1,
      imageCap1: data.imageCap1,
      paragraph1: data.paragraph1,
      image2: data.image2,
      imageCap2: data.imageCap2,
      paragraph2: data.paragraph2,
      services,
    }
  },
  data() {
    return {
      // The name of the area
      areaName: this.$route.params.id,

      // Additional query values required by the dynamic breadcrumb
      personName: this.$route.query.person,
      personID: this.$route.query.pID,
      eventName: this.$route.query.event,
      eventID: this.$route.query.eID,
      serviceName: this.$route.query.service,
      serviceID: this.$route.query.sID,
    }
  },
  head() {
    return {
      title: 'Plug-IT | ' + this.areaName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.overview,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
