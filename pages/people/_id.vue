<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: 'People', path: '/people' }]"
        :alt-routes="[
          [
            { title: person.area, path: '/areas/ID' },
            { title: 'AREANAME Team', path: '/areas/ID/team' },
          ],
          [
            { title: 'SERVICENAME', path: '/services/ID' },
            { title: 'SERVICENAME Team', path: '/services/ID/team' },
          ],
          [
            { title: 'Events', path: '/events' },
            { title: 'EVENTNAME', path: '/events/ID' },
          ],
        ]"
        current-page="PERSONNAME"
      />
      <div class="position-label">{{ person.position }}</div>
      <paragraph
        :image="person.image"
        :image-cap="person.imageCap"
        position="right"
      >
        <p>{{ person.bio }}</p>
        <a
          :href="person.linkedin"
          target="_blank"
          rel="noopener"
          aria-label="personal-linkedin-page"
          ><base-button
            icon="mdi mdi-linkedin"
            label="Find me on Linkedin"
            @click.native="navigateToExternal('www.linkedin.com')"
          ></base-button
        ></a>
      </paragraph>
    </section>
    <hr />
    <section v-if="person.responsibilities" class="section-container">
      <h2>Responsibilities</h2>
      <grid :elements="person.responsabilities" />
    </section>
    <hr />
    <section class="section-container">
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
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/people/${id}`
    )
    const person = {
      name: data.name + ' ' + data.surname,
      image: data.image,
      bio: data.bio,
      position: data.position,
      linkedin: data.linkedin,
      responsibilities:
        data.responsibility !== undefined
          ? {
              image: data.responsibility.image,
              heading: data.responsibility.name,
              destinationLink: '/areas/' + data.responsibility.id,
            }
          : undefined,
    }
    const tasks = []
    data.services.forEach(function (service) {
      tasks.push({
        image: service.image1,
        heading: service.name,
        destinationLink: '/services/' + service.id,
        subheading: service.areaName,
        subheadingLink: '/areas/' + service.areaName,
      })
    })
    return {
      person,
      tasks,
    }
  },
  data() {
    return {
      testCap: 'This is an image',
      testImage: '/PeopleImages/PhilSchiller.jpg',
    }
  },
}
</script>

<style scoped></style>
