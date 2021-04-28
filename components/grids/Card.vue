<!--
  Component: Card
  Description: A card with an image and a structured description
  Props:
  ├── image: card image path
  ├── heading: main heading of the card
  ├── destination-link: destination link of the heading and image
  ├── subheading: subheading of the card
  ├── subheading-link: link of the subheading (optional)
  ├── label: additional label of the card (optional)
  ├── label-icon: icon to be shown before the label (optional)
  └── summary: short paragraph to be shown inside the card (optional)
-->

<template>
  <div class="card">
    <!-- Right card image -->
    <div class="card-image">
      <figure class="wrapper" @click="navigateTo(destinationLink)">
        <img :src="image" :alt="heading" />
      </figure>
    </div>

    <!-- Structured card description -->
    <div class="card-description">
      <!-- Heading -->
      <h3>
        <nuxt-link :to="destinationLink">
          {{ heading }}
        </nuxt-link>
      </h3>

      <!-- Subeading and related icon -->
      <h4>
        <nuxt-link
          :class="subheadingLink !== '' ? '' : 'disabled-link'"
          :to="subheadingLink"
        >
          {{ subheading }}
        </nuxt-link>
      </h4>

      <!-- Label -->
      <h4 v-if="label != ''"><span :class="labelIcon"></span> {{ label }}</h4>

      <!-- Summary -->
      <p v-if="summary != ''">{{ summary }}</p>
    </div>
  </div>
</template>

<script>
import RoutingMixins from '~/mixins/Routing.js'
export default {
  mixins: [RoutingMixins],
  props: {
    // image: card image path
    image: { type: String, default: () => '', required: true },

    // heading: main heading of the card
    heading: { type: String, default: () => '', required: true },

    // destination-link: destination link of the heading and image
    destinationLink: { type: String, default: () => '', required: true },

    // subheading: subheading of the card
    subheading: { type: String, default: () => '', required: true },

    // subheading-link: link of the subheading (optional)
    subheadingLink: { type: String, default: () => '' },

    // label: additional label of the card (optional)
    label: { type: String, default: () => '' },

    // label-icon: icon to be shown before the label (optional)
    labelIcon: { type: String, default: () => '' },

    // summary: short paragraph to be shown inside the card (optional)
    summary: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
.wrapper {
  display: inline-block;
  margin: auto;
}
.card {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-evenly;
}

.card-description {
  width: 60%;
  padding-left: 2em;
  padding-right: 1em;
}

.card-image {
  max-width: 40%;
}

img {
  height: 100px;
  width: 100px;
}

h3 {
  margin-top: 0px;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 21px;
}
h4 {
  margin: 0px;
  font-size: 18px;
  font-weight: 400;
}
</style>
