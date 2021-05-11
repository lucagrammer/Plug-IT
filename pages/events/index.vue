<template>
  <main class="page-container">
    <!-- FILTERING OPTIONS -->
    <section class="section-container">
      <breadcrumb current-page="Events" />
      <select-filter @filter-change="filterByArea" />
    </section>
    <tab-view
      :tabs="['Upcoming Events', 'Past Events']"
      @tab-change="filterByTab"
    />

    <!-- EVENT RESULTS -->
    <section class="section-container">
      <!-- Grid of events -->
      <grid v-if="matchCounter > 0" :elements="events" />

      <!-- No results message -->
      <p v-else class="error">
        <span class="mdi mdi-alert-circle"></span>
        No {{ selectedTab == '0' ? 'upcoming' : 'past' }} events found
        {{ selectedArea == 'All' ? '' : 'for the ' + selectedArea + ' area' }}
      </p>
    </section>
  </main>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import Grid from '~/components/grids/Grid.vue'
import SelectFilter from '~/components/SelectFilter.vue'
import TabView from '~/components/TabView.vue'
export default {
  components: {
    Grid,
    TabView,
    Breadcrumb,
    SelectFilter,
  },
  async asyncData({ $axios, redirect }) {
    // fetch the events from the database
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/events`)
    if (data === null || data.length === 0) {
      return redirect(
        '/error?err=Failed to retrieve event data. Try again later.'
      )
    }

    // parameters required by the breadcrumb component of the destination page
    const fromEventToArea = '?route=2'

    // convert the fetched data into the format required by the components
    const fetchedEvents = []
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
        area: event.areaName, // additional property fot filtering purposes
        date: new Date(event.date), // additional property fot filtering purposes
      })
    })
    return {
      fetchedEvents,
    }
  },
  data() {
    return {
      // Default option for area
      selectedArea: 'All',

      // Default option for tab
      selectedTab: 0,

      // Current date
      today: new Date(),
    }
  },
  head() {
    return {
      title: 'Plug-IT | Events',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'All the events organized by Plug-IT for the various areas in which we operate: Internet of Things, Security, Business Management, Education and Artificial Intelligence. ',
        },
      ],
    }
  },
  computed: {
    // Compute and sort the events to be shown based on the selected options (area and tab)
    events() {
      if (this.fetchedEvents === undefined) return []
      return this.fetchedEvents
        .filter(
          (ev) =>
            (this.selectedArea === ev.area || this.selectedArea === 'All') &&
            ((this.today < ev.date && this.selectedTab === 0) ||
              (this.today > ev.date && this.selectedTab === 1))
        )
        .sort((ev1, ev2) => ev1.date - ev2.date)
    },

    // Compute the number of showed events
    matchCounter() {
      return this.events.length
    },
  },
  methods: {
    // Change the area filter option
    filterByArea(chosenValue) {
      this.selectedArea = chosenValue
    },

    // Change the upcoming/past filter option
    filterByTab(chosenTab) {
      this.selectedTab = chosenTab
    },
  },
}
</script>

<style scoped>
/* Appearance of the error message */
.error {
  text-align: center;
  margin-top: 20vh;
}
</style>
