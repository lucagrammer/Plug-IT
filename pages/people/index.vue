<template>
  <main class="page-container">
    <section class="section-container">
      <h1>People</h1>
    </section>
    <section class="section-container">
      <paragraph :image="testImage" :image-cap="testCap" position="left">
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
      <grid :elements="people" />
    </section>
    <hr />
  </main>
</template>

<script>
// import axios from 'axios'
import Grid from '~/components/grids/Grid.vue'
import Paragraph from '~/components/Paragraph.vue'

export default {
  components: {
    Paragraph,
    Grid,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/people`)
    const res = data
    const people = []
    console.log(res)
    for (const person in res) {
      console.log(person.name)
      people.push({
        heading: person.name + ' ' + person.surname,
        image: person.image,
        destinationLink: '/people/' + person.id,
        subheading: person.position,
      })
    }
    console.log(people)
    return {
      people,
    }
  },
  data() {
    return {
      // adUrl: '',
      testCap: 'This is an image',
      testImage: '/security.png',
    }
  },
  /*
  mounted() {
    setTimeout(async () => {
      const { data } = await axios.get('/api/ad')
      this.adUrl = data.url
    }, 1000)
  }, */ methods: {
    goToService(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style scoped></style>
