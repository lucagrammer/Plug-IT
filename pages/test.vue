<template>
  <main class="page-container">
    <section class="section-container">
      <h1>
        This page contains the breadcrumb components for all the pages.
        UPPERCASE => value retrieved from db and passed.
      </h1>

      <breadcrumb current-page="Events" />

      <breadcrumb
        :default-route="[{ title: 'Events', path: '/events' }]"
        current-page="EVENT"
      />

      <breadcrumb current-page="About" />

      <breadcrumb current-page="Contact" />

      <breadcrumb current-page="People" />

      <breadcrumb
        :default-route="[{ title: 'People', path: '/people' }]"
        :alt-routes="[
          [
            { title: 'AREANAME', path: '/areas/ID' },
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

      <breadcrumb current-page="Areas" />

      <breadcrumb
        :default-route="[{ title: 'Areas', path: '/areas' }]"
        :alt-routes="[
          [
            { title: 'People', path: '/people' },
            { title: 'PERSONENAME', path: '/people/ID' },
          ],
        ]"
        current-page="AREANAME"
      />

      <breadcrumb
        :default-route="[{ title: 'AREANAME', path: '/areas/ID' }]"
        current-page="AREANAME Team"
      />

      <breadcrumb current-page="Services" />

      <breadcrumb
        :default-route="[{ title: 'Our Services', path: '/services' }]"
        :alt-routes="[
          [{ title: 'AREANAME', path: '/areas/ID' }],
          [
            { title: 'People', path: '/people' },
            { title: 'PERSONENAME', path: '/people/ID' }, // these values must be specified as param
          ],
          [
            { title: ' events', path: '/events' },
            { title: 'EVENTNAME', path: '/events/ID' },
          ],
        ]"
        current-page="SERVICENAME"
      />

      <breadcrumb
        :default-route="[{ title: 'SERVICENAME', path: '/services/ID' }]"
        current-page="SERVICENAME Team"
      />
    </section>
  </main>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
export default {
  components: { Breadcrumb },
  data() {
    return {
      testCap: 'This is an image',
      testImage: '/security.png',
    }
  },
}
</script>

<style scoped></style>
