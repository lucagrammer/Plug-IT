<template>
  <main class="page-container">
    <slideshow
      :slides="[
        {
          image: '/slideshow/security.jpg',
          alt: 'Un tizio',
          title: 'Discover our latest xxx',
          description: 'This is a short sentence',
          link: '/areas/security',
        },
        {
          image: '/slideshow/educational.jpg',
          alt: 'Un altro tizio',
          title: 'Discover our latest yyy',
          description: 'This is a short sentence too',
          link: '/areas/educational',
        },
        {
          image: '/slideshow/ai.jpg',
          alt: 'Un altro tizio',
          title: 'Discover our latest zzz',
          description: 'This is a short sentence too',
          link: '/areas/pippo',
        },
        {
          image: '/slideshow/business.jpg',
          alt: 'Un altro tizio',
          title: 'Discover our latest qqq',
          description: 'This is a short sentence too',
          link: '/areas/pluto',
        },
        {
          image: '/slideshow/iot.jpg',
          alt: 'Un altro tizio',
          title: 'Discover our latest fff',
          description: 'This is a short sentence too',
        },
      ]"
    />
    <section class="section-container">
      <paragraph>
        <h1>Text only paragraph</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum'.
        </p>
      </paragraph>
    </section>
    <hr />
    <section class="section-container">
      <h2>A grid example</h2>
      <grid :featured-element="featuredElement" :elements="testElements" />
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
        heading="If you are interested in this event, please contact us"
        page-name="pippo"
      />
    </section>
  </main>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import Grid from '~/components/grids/Grid.vue'
import Paragraph from '~/components/Paragraph.vue'
import ContactForm from '~/components/ContactForm.vue'
import MapView from '~/components/MapView.vue'
import Slideshow from '~/components/Slideshow.vue'
export default {
  components: {
    BaseButton,
    Paragraph,
    Grid,
    ContactForm,
    MapView,
    Slideshow,
  },
  data() {
    return {
      testImage: '/security.png',
      featuredElement: {
        id: 1,
        image: 'event.png',
        heading: 'This is a featured element',
        subheadingLink: '/areas/2',
        destinationLink: '/events/23',
        subheading: 'Subheading',
        label: 'Label',
        summary: 'This is a short summary for the featured element',
      },
      testElements: [
        {
          id: 1,
          image: 'event.png',
          heading: '5 Signs You’re Under Attack',
          subheadingLink: '/areas/1',
          destinationLink: '/events/1',
          subheading: 'Security',
          labelIcon: 'mdi mdi-calendar',
          label: '12 apr 2021, 12.30 AM',
          summary:
            'What is the best way to avoid having a cyberattack turn into a full breach? Prepare in advance',
        },
        {
          id: 1,
          image: 'event.png',
          heading: '5 Signs You’re Under Attack',
          subheading: 'Security',
          destinationLink: '/events/24',
          subheadingLink: '/areas/3',
          labelIcon: 'mdi mdi-calendar',
          label: '12 apr 2021, 12.30 AM',
          summary: 'Prepare in advance',
        },
        {
          id: 2,
          image: 'classter_logo.png',
          heading: 'Just another educational service',
          subheading: 'Education',
          destinationLink: '/services/3',
          subheadingLink: '/areas/3',
          label: 'Project Manager',
        },
        {
          id: 3,
          image: 'tizio.jpg',
          heading: 'Mario Rossi',
          destinationLink: '/people/1',
          label: 'Software Engineer',
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
  margin-bottom: 0px;
}
</style>
