<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb current-page="People" />
      <paragraph
        image="/people/people.jpeg"
        image-cap="A Plug-IT team at work around a desk"
        position="left"
      >
        <p>
          Plug-IT is made up of talented individuals who share a
          <strong>passion</strong>
          for achieving the best in everything they do. Our team puts
          <strong>our clients first</strong>, with a relentless focus on
          championing bold ideas that help them achieve the extraordinary.
        </p>
        <p>
          In every office, on every team, you’ll find passionate, collaborative
          people who care for you and your success. We take a proactive approach
          to helping you develop a strategy to address your goals and
          objectives, using the most efficient methods available.
        </p>
      </paragraph>
    </section>
    <hr />
    <section class="section-container">
      <grid :elements="people" />
    </section>
  </main>
</template>

<script>
import Grid from '~/components/grids/Grid.vue'
import Paragraph from '~/components/Paragraph.vue'

export default {
  components: {
    Paragraph,
    Grid,
  },
  async asyncData({ $axios, redirect }) {
    // fetch the people from the database
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/people`)
    if (data === null || data.length === 0) {
      return redirect(
        '/error?err=Failed to retrieve employee data. Try again later.'
      )
    }

    // convert the fetched data into the format required by the components
    const people = []
    data.forEach(function (person) {
      people.push({
        heading: person.name + ' ' + person.surname,
        image: person.image,
        destinationLink: '/people/' + person.id,
        subheading: person.position,
      })
    })
    return {
      people,
    }
  },
}
</script>

<style scoped></style>
