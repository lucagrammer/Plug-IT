<template>
  <main class="page-container">
    <!-- SLIDER WITH FEATURED SERVICES -->
    <slideshow :slides="slides" />

    <section class="section-container">
      <!-- GRID WITH NEXT 4 EVENTS-->
      <h2>Upcoming Events</h2>
      <grid :elements="undefined" />
      <base-button
        label="Find out more"
        icon="mdi mdi-calendar"
        class="right-button"
        @click.native="navigateTo('/events')"
      />
    </section>
  </main>
</template>

<script>
import Grid from '~/components/grids/Grid.vue'
import Slideshow from '~/components/Slideshow.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    Grid,
    Slideshow,
  },
  mixins: [RoutingMixins],
  async asyncData({ $axios }) {
    // fetch the next 4 events from the database
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/events`) // TODO: CHANGE API URL WITH THE ONE THAT RETURNS ONLY 4 EVENTS
    const fetchedEvents = []
    // convert the fetched data into the format required by the components
    data.forEach(function (event) {
      fetchedEvents.push({
        image: event.image,
        heading: event.title,
        destinationLink: '/events/' + event.id,
        subheading: event.areaName,
        subheadingLink: '/areas/' + event.areaName,
        label: event.date + ', ' + event.time.substring(0, 5),
        labelIcon: 'mdi mdi-calendar',
        summary: event.overview,
      })
    })
    return {
      fetchedEvents,
    }
  },
  data() {
    return {
      // Slideshow content
      slides: [
        {
          image: '/services/iot/IHC.jpeg',
          alt: 'TODO',
          title: 'Smart Offices at their best with IHC',
          description:
            'We help you connect your services together in remarkable new ways. IHC is the easiest way to do more with apps and devices like Twitter, Dropbox, iRobot, Fitbit, Alexa and much more.',
          labelType: 'new',
          link: '/services/12',
        },
        {
          image: '/services/security/PhishTreat.jpeg',
          alt: 'TODO',
          title: 'Phish Threat to manage digital risk',
          description:
            'Attacks have shown record growth in recent years, and a solid security awareness program is an integral part of any defence-in-depth strategy.',
          labelType: 'popular',
          link: '/services/13',
        },
        {
          image: '/services/business_management/PowerBI.png',
          alt: 'TODO',
          title: 'Discover hidden data with PowerBI',
          description:
            'Unleash the potential of your business data and achieve success in your business. With PowerBI you can analyse turnover, sales network results, costs and forecasts in just a few clicks.',
          labelType: 'new',
          link: '/services/13',
        },
        {
          image: '/services/ai/AIP+.jpeg',
          alt: 'TODO',
          title: 'AIP+: AI for every business',
          description:
            'A collection of modular, pre-integrated AI services and capabilities, designed to make it significantly easier to adopt AI throughout your business.',
          labelType: 'popular',
          link: '/services/13',
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
</style>
