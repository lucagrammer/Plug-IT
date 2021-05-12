<template>
  <main class="page-container">
    <!-- SLIDER WITH FEATURED SERVICES -->
    <slideshow :slides="slides" />

    <section class="section-container">
      <!-- GRID WITH NEXT 4 EVENTS-->
      <h2>Upcoming Events</h2>

      <grid v-if="eventsCounter > 0" :elements="fetchedEvents" />

      <!-- No results message -->
      <p v-else class="error">
        <span class="mdi mdi-alert-circle"></span>
        No upcoming events
      </p>

      <base-button
        label="Discover other events"
        icon="mdi mdi-calendar"
        class="right-button"
        @click.native="navigateTo('/events')"
      />
    </section>
  </main>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import Grid from '~/components/grids/Grid.vue'
import Slideshow from '~/components/Slideshow.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    Grid,
    Slideshow,
    BaseButton,
  },
  mixins: [RoutingMixins],
  async asyncData({ $axios }) {
    // fetch the next 4 events from the database
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/upcomingEvents`
    )
    // parameters required by the breadcrumb component of the destination page
    const fromEventToArea = '?route=2'

    // convert the fetched data into the format required by the components
    const fetchedEvents = []
    // convert the fetched data into the format required by the components
    data.forEach(function (event) {
      fetchedEvents.push({
        image: event.icon,
        heading: event.title,
        destinationLink: '/events/' + event.id,
        subheading: event.areaName,
        subheadingLink: '/areas/' + event.areaName + fromEventToArea,
        label: event.date + ', ' + event.time.substring(0, 5),
        labelIcon: 'mdi mdi-calendar',
        summary: event.overview,
      })
    })
    return {
      fetchedEvents,
      eventsCounter: fetchedEvents.length,
    }
  },
  data() {
    return {
      // Slideshow content
      slides: [
        {
          image: '/slideshow/1.png',
          alt: 'A woman, standing in front of a table, uses a tablet to access smart office services.',
          title: 'Smart Offices at their best with IHC',
          description:
            'We help you connect your services together in remarkable new ways. IHC is the easiest way to do more with apps and devices like Twitter, Dropbox, iRobot, Fitbit, Alexa and much more.',
          labelType: 'new',
          link: '/services/25',
        },
        {
          image: '/slideshow/2.png',
          alt: 'A stream of bits and a padlock',
          title: 'Phish Threat to manage digital risk',
          description:
            'Attacks have shown record growth in recent years, and a solid security awareness program is an integral part of any defence-in-depth strategy.',
          labelType: 'popular',
          link: '/services/6',
        },
        {
          image: '/slideshow/3.png',
          alt: 'A hand points to graphs shown on a computer monitor. Another employee looks at the monitor',
          title: 'Discover hidden data with PowerBI',
          description:
            'Unleash the potential of your business data and achieve success in your business. With PowerBI you can analyse turnover, sales network results, costs and forecasts in just a few clicks.',
          labelType: 'new',
          link: '/services/16',
        },
        {
          image: '/slideshow/4.png',
          alt: 'A robot performs complex calculations thanks to artificial intelligence',
          title: 'AIP+: AI for every business',
          description:
            'A collection of modular, pre-integrated AI services and capabilities, designed to make it significantly easier to adopt AI throughout your business.',
          labelType: 'popular',
          link: '/services/19',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* Enable (locally) overlap between slideshow and navbar */
.page-container {
  margin-top: 0px;
}

/* Positioning of the find-out-more button */
.right-button {
  float: right;
}

.error {
  text-align: center;
  margin-top: 20vh;
}
</style>
