<template>
  <main class="page-container">
    <slideshow
      :slides="[
        {
          image: '/services/IHC.jpeg',
          alt: 'Un tizio',
          title: 'Smart Offices at their best with IHC',
          description:
            'We help you connect your services together in remarkable new ways. IHC is the easiest way to do more with apps and devices like Twitter, Dropbox, iRobot, Fitbit, Alexa and much more',
          link: '/services/12',
        },
        {
          image: '/services/PhishTreat.jpeg',
          alt: 'Un tizio',
          title: 'Stay safe thanks to Phish Threat',
          description:
            'Attacks have shown record growth in recent years, and a solid security awareness program is an integral part of any defence-in-depth strategy',
          link: '/services/13',
        },
        {
          image: '/services/PowerBI.jpg',
          alt: 'Un tizio',
          title: 'Discover hidden data with PowerBI',
          description:
            'Unleash the potential of your business data and achieve success in your business. With PowerBI you can analyse turnover, sales network results, costs and forecasts in just a few clicks. ',
          link: '/services/13',
        },
      ]"
    />
    <section class="section-container">
      <nuxt-link to="/test">Go to TEST PAGE</nuxt-link>
      <h2>Upcoming Events</h2>
      <grid :elements="upcomingEvents" />
    </section>
    <slideshow
      :slides="[
        {
          image: '/slideshow/security.jpg',
          alt: 'Security algorithm code. Discover more.',
          title: 'Manage the digital risk of your enterprise',
          description:
            'We combine security technology engineering and out intelligence expertise to help companies manage digital risk end-to-end.',
          link: '/areas/security',
        },
        {
          image: '/slideshow/educational.jpeg',
          alt: 'Children with hands up. Discover more.',
          title: 'Expand learning for everyone',
          description:
            'Transform how educators and students learn, work, and innovate together.',
          link: '/areas/educational',
        },
        {
          image: '/slideshow/ai.jpg',
          alt: 'A network of artificial intelligence links. Discover more.',
          title: 'Unlock new possibilities with AI',
          description:
            'We embed AI capabilities in our software to provide you with more intelligent, automated solutions',
          link: '/areas/pippo',
        },
        {
          image: '/slideshow/business.jpg',
          alt: 'A glass facade of a building. Discover more.',
          title: 'Flexible systems for business management.',
          description:
            'Our solutions simplify IT management and allow company to use technology in order to reduce costs and support the company growth',
          link: '/areas/pluto',
        },
        {
          image: '/slideshow/iot.jpg',
          alt: 'Tangles of electrical wires. Discover more.',
          title: 'Full-stack IoT solutions',
          description:
            'We design future-ready IoT architectures, assemble enterprise-grade IoT data pipelines and deliver the insights our customers need to implement IoT initiatives.',
        },
      ]"
    />
  </main>
</template>

<script>
import Grid from '~/components/grids/Grid.vue'
import Slideshow from '~/components/Slideshow.vue'
export default {
  components: {
    Grid,
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
