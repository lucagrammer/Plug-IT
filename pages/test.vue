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
    <hr />
    <section class="section-container">
      <paragraph
        :image="testImage"
        image-cap="A man in front of a PC writing code"
        position="left"
      >
        <h2>Left paragraph</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum'.
        </p>
        <base-button
          label="Button component with lorem ipsum"
          icon="mdi mdi-account-multiple"
        ></base-button>
      </paragraph>
      <paragraph :image="testImage" image-cap="Bits flowing" position="right">
        <h2>Right one</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum'
        </p>
      </paragraph>
    </section>
    <hr />
    <section class="section-container">
      <h2>This is a test map</h2>
      <map-view>
        <h2>Our Offices</h2>
        <p>
          <span class="mdi mdi-map-marker"></span> Via Valtellina, 110
          <br />
          20144 Milano, Italia
        </p>
        <div class="phone-number">
          <span class="mdi mdi-phone"></span> Tel:
          <a href="tel:+393347711504"> +39 334 7711504</a>
        </div>
        <div class="phone-number">
          <span class="mdi mdi-fax"></span> Fax:
          <a href="fax:+393347711504">+39 011 7400016</a>
        </div>
      </map-view>
    </section>
    <hr />
    <section class="section-container">
      <contact-form
        heading="If you are interested to this event, please contact us"
        page-name="pippo"
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
