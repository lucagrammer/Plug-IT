<!--
  Component: Card
  Description: A card with an image and a structured description
  Props:
  ├── image: card image path (headign prop is used as alt attribute)
  ├── icon: the icon to be shown (optional)
  ├── heading: main heading of the card
  ├── destination-link: destination link of the heading and image (optional)
  ├── subheading: subheading of the card
  ├── subheading-icon: icon to be shown before the subheading (optional)
  ├── subheading-link: link of the subheading (optional)
  ├── label: additional label of the card (optional)
  └── summary: short paragraph to be shown inside the card (optional)
-->

<template>
  <div class="card">
    <!-- Right card image -->
    <div class="card-image">
      <figure class="wrapper">
        <nuxt-link
          :class="destinationLink !== '' ? '' : 'disabled-link'"
          :to="destinationLink"
        >
          <img :src="image" :alt="heading" />
        </nuxt-link>
      </figure>
    </div>

    <!-- Structured card description -->
    <div class="card-description">
      <!-- Heading -->
      <h3>
        <nuxt-link
          :class="destinationLink !== '' ? '' : 'disabled-link'"
          :to="destinationLink"
        >
          {{ heading }}
        </nuxt-link>
      </h3>

      <!-- Subeading and related icon -->
      <h4>
        <nuxt-link
          :class="subheadingLink !== '' ? '' : 'disabled-link'"
          :to="subheadingLink"
        >
          <span :class="subheadingIcon"></span>
          {{ subheading }}
        </nuxt-link>
      </h4>

      <!-- Label -->
      <h4>{{ label }}</h4>

      <!-- Summary -->
      <p>{{ summary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // image: card image path (headign prop is used as alt attribute)
    image: { type: String, default: () => '' },

    // heading: main heading of the card
    heading: { type: String, default: () => '' },

    // destination-link: destination link of the heading and image (optional)
    destinationLink: { type: String, default: () => '' },

    // subheading: subheading of the card
    subheading: { type: String, default: () => '' },

    // subheading-icon: icon to be shown before the subheading (optional)
    subheadingIcon: { type: String, default: () => '' },

    // subheading-link: link of the subheading (optional)
    subheadingLink: { type: String, default: () => '' },

    // label: additional label of the card (optional)
    label: { type: String, default: () => '' },

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
