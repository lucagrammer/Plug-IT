<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: 'Events', path: '/events' }]"
        :current-page="eventName"
      />

      <!-- RELATED AREA -->
      <nuxt-link class="area-label" :to="'/areas/' + area + fromEventToArea">
        {{ area }}
      </nuxt-link>

      <!-- EVENT OVERVIEW -->
      <paragraph>
        <p>{{ overview }}</p>
      </paragraph>

      <!-- EVENT PARAGRAPH -->
      <paragraph :image="image" :image-cap="imageCap" position="right">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="paragraph">{{ paragraph }}</div>
      </paragraph>
    </section>
    <hr />

    <!-- EVENT HOSTS -->
    <section class="section-container">
      <h2>Hosts</h2>
      <grid :elements="hosts" />
    </section>
    <hr />

    <!-- EVENT DETAILS -->
    <section class="section-container">
      <h2>Details</h2>
      <map-view :map-id="map">
        <h3>Where</h3>
        <p><span class="mdi mdi-map-marker"></span> {{ location }}</p>

        <h3>When</h3>
        <p>
          <span class="mdi mdi-calendar"></span> On {{ date }}, at
          {{ time }}
        </p>
      </map-view>
    </section>
    <hr />

    <!-- EVENT CONTACT FORM -->
    <section class="section-container">
      <contact-form
        heading="If you are interested to this event, please contact us"
        :page-name="'EVENT_ID: ' + eventID"
      />
    </section>
  </main>
</template>

<script>
import Grid from '~/components/grids/Grid.vue'
import Paragraph from '~/components/Paragraph.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    Paragraph,
    Grid,
  },
  mixins: [RoutingMixins],
  async asyncData({ $axios, route, redirect }) {
    const eventID = route.params.id

    // fetch the info from the database
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/event/${eventID}`
    )
    if (data === null) {
      return redirect(
        '/error?err=The event you are looking for does not exist.'
      )
    }

    // parameters required by the breadcrumb component of the destination page
    const fromEventToArea = '?route=1&eID=' + eventID + '&event=' + data.title
    const fromEventToPeople = '?route=2&eID=' + eventID + '&event=' + data.title

    // convert the fetched data into the format required by the components
    const hosts = []
    data.people.forEach(function (host) {
      hosts.push({
        image: host.image,
        heading: host.name + ' ' + host.surname,
        destinationLink: '/people/' + host.id + fromEventToPeople,
        subheading: host.position,
      })
    })
    return {
      eventID,
      eventName: data.title,
      overview: data.overview,
      image: data.image,
      imageCap: data.imageCap,
      paragraph: data.paragraph,
      area: data.areaName,
      date: data.date,
      time: data.time.substring(0, 5),
      map: data.map,
      location: data.location,
      fromEventToArea,
      hosts,
    }
  },
}
</script>

<style scoped></style>
