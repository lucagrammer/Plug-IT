<!--
  Component: TabView
  Description: TabView for switching between tabs. On tab switch emit a 'tab-change' event
  Props: 
  └── tabs: array of tab names. Element tabs[0] is selected by default
-->

<template>
  <div>
    <!-- SWITCH COMMANDS -->
    <div class="section-container tab-headings">
      <div
        v-for="(tab, tabIndex) of tabs"
        :key="'tab-' + tabIndex"
        :class="'tab-heading ' + headingClass(tabIndex)"
        tabindex="0"
        @click="onChange(tabIndex)"
        @keyup.enter="onChange(tabIndex)"
      >
        {{ tab }}
      </div>
    </div>
    <div class="hr" />
  </div>
</template>

<script>
export default {
  props: {
    /** tabs: array of tabs name. Element slide[0] is selected by default */
    tabs: { type: Array, default: () => [], required: true },
  },
  data() {
    return {
      /** Tab number currently shown */
      selected: 0,
    }
  },
  computed: {
    /** Return the class for the heading based on the tab number */
    headingClass(tabNumber) {
      return (tabNumber) => (tabNumber === this.selected ? 'selected-tab' : '')
    },
  },
  methods: {
    /** Emit the tab-change event */
    onChange(tabIndex) {
      this.selected = tabIndex
      this.$emit('tab-change', tabIndex)
    },
  },
}
</script>

<style scoped>
/* Tab heading container */
.tab-headings {
  margin-top: 4px;
  padding-left: 8px;
}

/* Tab heading spacing and positioning */
.tab-heading {
  cursor: pointer;
  padding-bottom: 7px;
  display: inline-block;
}
.tab-heading:first-child {
  margin-right: 25px;
}

/* Appearance of the selected heading */
.selected-tab {
  font-weight: 500;
  border-bottom: 3px solid black;
}

/* Horizontal line */
.hr {
  border-top: 2px solid black;
}
</style>
