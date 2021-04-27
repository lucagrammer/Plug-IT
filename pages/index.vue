<template>
  <main class="page-container">
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
      <paragraph :image="testImage" :image-cap="testCap" position="left">
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
      <paragraph :image="testImage" :image-cap="testCap" position="right">
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
    <section>
      <contact-form pageName="pippo" />
    </section>
  </main>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
import Grid from '~/components/grids/Grid.vue'
import Paragraph from '~/components/Paragraph.vue'
import ContactForm from '~/components/ContactForm.vue'
export default {
  components: {
    BaseButton,
    Paragraph,
    Grid,
    ContactForm,
  },
  data() {
    return {
      testCap: 'This is an image',
      testImage: '/security.png',
      featuredElement: {
        id: 1,
        image: 'event.png',
        heading: 'This is a featured element',
        subheadingLink: '',
        destinationLink: '',
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
          subheading: '12 apr 2021, 12.30 AM',
          subheadingIcon: 'mdi mdi-calendar',
          label: 'Security',
          summary:
            'What is the best way to avoid having a cyberattack turn into a full breach? Prepare in advance',
        },
        {
          id: 1,
          image: 'event.png',
          heading: '5 Signs You’re Under Attack',
          subheading: '12 apr 2021, 12.30 AM',
          subheadingIcon: 'mdi mdi-calendar',
          label: 'Security',
          summary: 'Prepare in advance',
        },
        {
          id: 2,
          image: 'classter_logo.png',
          heading: 'Just another educational service',
          subheading: 'Education',
          label: 'Project Manager',
        },
        {
          id: 3,
          image: 'tizio.jpg',
          heading: 'Mario Rossi',
          destinationLink: '/people/1',
          subheading: 'Software Engineer',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
