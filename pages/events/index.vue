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
import Grid from '~/components/grids/Grid.vue'
import TabView from '~/components/TabView.vue'
export default {
  components: {
    Grid,
    TabView,
  },
  async asyncData({ $axios }) {
    // fetch the events from the database
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/events`)
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
        .sort((ev1, ev2) => ev2.date - ev1.date)
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
