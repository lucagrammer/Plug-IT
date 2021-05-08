<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: 'People', path: '/people' }]"
        :alt-routes="[
          [
            { title: areaName, path: '/areas/' + areaName },
            {
              title: areaName + ' Team',
              path: '/areas/team/' + areaName,
            },
          ],
          [
            {
              title: serviceName,
              path: '/services/' + serviceID,
            },
            {
              title: serviceName + ' Team',
              path: '/services/team/' + serviceID,
            },
          ],
          [
            { title: 'Events', path: '/events' },
            {
              title: eventName,
              path: '/events/' + eventID,
            },
          ],
          [{ title: areaName, path: '/areas/' + areaName }],
        ]"
        :current-page="name"
      />
      <div class="position-label">{{ position }}</div>

      <!-- EMPLOYEE BIO AND PHOTO -->
      <paragraph :image="image" :image-cap="name" position="right">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="bio">{{ bio }}</div>
        <base-button
          icon="mdi mdi-linkedin"
          label="Find me on Linkedin"
          @click.native="
            navigateToExternal('https://www.linkedin.com/' + linkedin)
          "
        ></base-button>
      </paragraph>
    </section>
    <hr v-if="areaResponsibilities" />

    <!-- AREAS FOR WHICH THE EMPLOYEE IS RESPONSIBLE -->
    <section v-if="areaResponsibilities" class="section-container">
      <h2>Responsibilities</h2>
      <grid :elements="areaResponsibilities" />
    </section>
    <hr v-if="tasks.length > 0" />

    <!-- SERVICES IN WHICH THE EMPLOYEE WORKS -->
    <section v-if="tasks.length > 0" class="section-container">
      <h2>Tasks</h2>
      <grid :elements="tasks" />
    </section>
  </main>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import Grid from '~/components/grids/Grid.vue'
import Paragraph from '~/components/Paragraph.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    BaseButton,
    Paragraph,
    Grid,
  },
  mixins: [RoutingMixins],
  async asyncData({ $axios, route, redirect }) {
    const personID = route.params.id

    // fetch the employee from the database
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/person/${personID}`
    )
    if (data === null) {
      return redirect(
        '/error?err=The employee you are looking for does not exist.'
      )
    }

    // parameters required by the breadcrumb component of the destination page
    const name = data.name + ' ' + data.surname
    const fromPeopleToService = '?route=1&person=' + name + '&pID=' + data.id
    const fromPeopleToArea = '?route=0&person=' + name + '&pID=' + data.id

    // convert the fetched data into the format required by the components
    const tasks = []
    let areaResponsibilities
    data.tasksAsPM.forEach(function (service) {
      tasks.push({
        image: service.icon,
        heading: service.name,
        destinationLink: '/services/' + service.id + fromPeopleToService,
        subheading: service.areaName,
        subheadingLink: '/areas/' + service.areaName + fromPeopleToArea,
        label: 'Project Manager',
      })
    })
    data.tasksAsAssistant.forEach(function (service) {
      tasks.push({
        image: service.icon,
        heading: service.name,
        destinationLink: '/services/' + service.id + fromPeopleToService,
        subheading: service.areaName,
        subheadingLink: '/areas/' + service.areaName + fromPeopleToArea,
        label: data.position,
      })
    })
    if (data.responsibility !== null)
      areaResponsibilities = [
        {
          image: data.responsibility.icon,
          heading: data.responsibility.name,
          destinationLink:
            '/areas/' + data.responsibility.name + fromPeopleToArea,
          label: 'Area Responsible',
        },
      ]
    return {
      name,
      image: data.image,
      bio: data.bio,
      position: data.position,
      linkedin: data.linkedin,
      areaResponsibilities,
      tasks,
    }
  },
  data() {
    return {
      // Additional query values required by the dynamic breadcrumb
      areaName: this.$route.query.area,
      eventName: this.$route.query.event,
      eventID: this.$route.query.eID,
      serviceName: this.$route.query.service,
      serviceID: this.$route.query.sID,
    }
  },
}
</script>

<style scoped>
.position-label {
  text-transform: uppercase;
}
</style>
