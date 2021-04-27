<template>
  <main class="page-container">
    <section class="section-container">
      <h1>About</h1>
    </section>
    <section class="section-container">
      <paragraph :image="testImage" :image-cap="testCap" position="right">
        <h2>Right paragraph</h2>
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
      </paragraph>
      <paragraph :image="testImage" :image-cap="testCap" position="right">
        <h2>Right paragraph</h2>
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
      <base-button
        label="Button component with lorem ipsum"
        icon="mdi mdi-email"
      />
    </section>
  </main>
</template>

<script>
import Paragraph from '~/components/Paragraph.vue'
export default {
  components: {
    Paragraph,
  },
  data() {
    return {
      testCap: 'This is an image',
      testImage: '/security.png',
    }
  },
}
</script>

<style scoped></style>
