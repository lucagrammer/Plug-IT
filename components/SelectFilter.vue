<!--
  Component: SelectFilter
  Description: A select filter for the areas that emits 'filter-change' events on selection
-->

<template>
  <form class="component-container">
    <label for="filter">Area</label>
    <select id="filter" ref="select" name="filter" @change="onChange">
      <option value="All">All areas</option>
      <option value="Security">Security</option>
      <option value="Education">Education</option>
      <option value="Business Management">Business Management</option>
      <option value="Internet of Things">Internet of Things</option>
      <option value="Artificial Intelligence">Artificial Intelligence</option>
    </select>
  </form>
</template>

<script>
export default {
  methods: {
    // Emit the filter-change event
    onChange(event) {
      this.$emit('filter-change', event.target.value)
    },
  },
}
</script>

<style scoped>
/* Componetn container */
.component-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

/* Appearence of the label */
label {
  width: auto;
  min-width: 40px;
  display: inline-block;
  margin: 8px;
  font-weight: 500;
  font-size: 18px;
  vertical-align: top;
}

/* Appearance of the select item */
select {
  width: auto;
  min-width: 60px;
  display: inline-block;
  border: 1px solid #212121;
  border-radius: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: white;
}

/* Prevent blue borders on focus/hover */
select:focus,
select:hover {
  outline-color: black;
  background: rgba(238, 238, 238, 0.9);
}
</style>
