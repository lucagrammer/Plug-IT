<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb
        :default-route="[{ title: 'Our Services', path: '/services' }]"
        :alt-routes="[
          [{ title: areaName, path: '/areas/' + areaName }],
          [
            { title: 'People', path: '/people' },
            { title: personName, path: '/people/' + personID },
          ],
          [
            { title: ' events', path: '/events' },
            { title: eventName, path: '/events/' + eventID },
          ],
        ]"
        :current-page="serviceName"
      />

      <!-- RELATED AREA -->
      <nuxt-link
        class="area-label"
        :to="'/areas/' + areaName + fromServiceToArea"
      >
        {{ areaName }}
      </nuxt-link>

      <!-- SERVICE SLOGAN -->
      <p>{{ slogan }}</p>

      <!-- SERVICE PARAGRAPH 1 -->
      <paragraph :image="image1" :image-cap="imageCap1" position="right">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="paragraph1">{{ paragraph1 }}</div>
      </paragraph>

      <!-- SERVICE PARAGRAPH 2 -->
      <paragraph :image="image2" :image-cap="imageCap2" position="left">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="paragraph2">{{ paragraph2 }}</div>
      </paragraph>
      <base-button
        :label="'Discover our ' + serviceName + ' Team'"
        icon="mdi mdi-account-group"
        @click.native="navigateTo('/services/team/' + serviceID)"
      />
    </section>
    <hr />

    <!-- CONTACT FORM -->
    <section class="section-container">
      <contact-form
        heading="If you are interested to this service, please contact us"
        :page-name="'SERVICE_ID: ' + serviceID"
      />
    </section>
  </main>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import Paragraph from '~/components/Paragraph.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    BaseButton,
    Paragraph,
  },
  mixins: [RoutingMixins],
  async asyncData({ $axios, route, redirect }) {
    const serviceID = route.params.id

    // fetch the info from the database
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/service/${serviceID}`
    )
    if (data === null) {
      return redirect(
        '/error?err=The service you are looking for does not exist.'
      )
    }

    // parameters required by the breadcrumb component of the destination page
    const fromServiceToArea =
      '?route=3&sID=' + serviceID + '&service=' + data.name

    return {
      serviceID,
      serviceName: data.name,
      areaName: data.areaName,
      slogan: data.slogan,
      image1: data.image1,
      imageCap1: data.imageCap1,
      paragraph1: data.paragraph1,
      image2: data.image2,
      imageCap2: data.imageCap2,
      paragraph2: data.paragraph2,
      fromServiceToArea,
    }
  },
  data() {
    return {
      // Additional query values required by the dynamic breadcrumb
      personName: this.$route.query.person,
      personID: this.$route.query.pID,
      eventName: this.$route.query.event,
      eventID: this.$route.query.eID,
    }
  },
}
</script>

<style scoped></style>
