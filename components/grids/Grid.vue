<!--
  Component: Grid
  Description:  A responsive grid of made up of Card elements. It shows up to two 
                card elements per row and, optionally, one featured element in the first row. 
                It recives as props the information required by the Card component.
  Props:
  ├── featured-element: featured card component props (optional)
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
          :subheading-link="featuredElement.subheadingLink"
          :label="featuredElement.label"
          :label-icon="featuredElement.labelIcon"
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
          :subheading-link="element.subheadingLink"
          :pre-label="element.preLabel"
          :label="element.label"
          :label-icon="element.labelIcon"
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
    /** featured-element: featured card component props (optional) */
    featuredElement: { type: Object, default: () => null },

    /** elements: array of card component props */
    elements: { type: Array, default: () => [], required: true },
  },
}
</script>

<style scoped>
/* Grid spacing */
.grid {
  margin-top: 1.5em;
  /* margin-bottom: 1.5em; */
  width: 100%;
  display: flow-root;
}

/* Full width elements for desktop devices */
.grid-element,
.row {
  position: relative;
  width: 100%;
}
.row {
  display: inline-block;
}

/* Two elements per row for mobile devices */
@media (min-width: 720px) {
  .grid-element {
    float: left;
    width: 50%;
  }
}
</style>
