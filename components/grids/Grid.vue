<!--
  Component: Grid
  Description: A grid of cards
  Props:
  ├── featured-element: featured card component props
  └── elements: array of card component props
-->

<template>
  <div class="grid">
    <!-- Featured element of the grid -->
    <div v-if="featuredElement !== null" class="row">
      <div class="grid-element">
        <card
          :image="featuredElement.image"
          :heading="featuredElement.heading"
          :destination-link="featuredElement.destinationLink"
          :subheading="featuredElement.subheading"
          :subheading-icon="featuredElement.subheadingIcon"
          :subheading-link="featuredElement.subheadingLink"
          :label="featuredElement.label"
          :summary="featuredElement.summary"
        />
      </div>
    </div>

    <!-- Rows containing the other elements of the grid. Two elements per row -->
    <div
      v-for="i in Math.ceil(elements.length / 2)"
      :key="'row-' + i"
      class="row"
    >
      <div
        v-for="(element, elementIndex) of elements.slice((i - 1) * 2, i * 2)"
        :key="'elem-' + elementIndex"
        class="grid-element"
      >
        <card
          :image="element.image"
          :heading="element.heading"
          :destination-link="element.destinationLink"
          :subheading="element.subheading"
          :subheading-icon="element.subheadingIcon"
          :subheading-link="element.subheadingLink"
          :label="element.label"
          :summary="element.summary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
export default {
  components: { Card },
  props: {
    // featured-element: featured card component props
    featuredElement: { type: Object, default: () => null },

    // elements: array of card component props
    elements: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.grid {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  width: 100%;
  display: flow-root;
}
.grid-element,
.row {
  position: relative;
  width: 100%;
}
.row {
  display: inline-block;
}

@media (min-width: 720px) {
  .grid-element {
    float: left;
    width: 50%;
  }
}
</style>
