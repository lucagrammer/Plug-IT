<template>
  <main class="page-container">
    <section class="section-container">
      <h1>Mario Rossi</h1>
      <paragraph :image="testImage" :image-cap="testCap" position="right">
        <h2></h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum'
        </p>
        <base-button
          label="Button component with lorem ipsum"
          icon="mdi mdi-account-multiple"
        ></base-button>
      </paragraph>
    </section>
    <hr />
    <section class="section-container">
      <h2>Responsibilities</h2>
      <grid :elements="responsabilities" />
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
export default {
  components: {
    BaseButton,
    Paragraph,
    Grid,
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
