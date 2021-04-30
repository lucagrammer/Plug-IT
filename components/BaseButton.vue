<!--
  Component: Button
  Description: A general purpose button with an optional icon
  Props:
  ├── label: the button label
  ├── type: the type of the button. Button by default. 
  ├── icon: the icon to be shown (optional)
  └── hover-flag: substitute the icon with the outline version on mouse hover. True by default.
-->

<template>
  <button :type="type" @mouseenter="outlineIcon()" @mouseleave="solidIcon()">
    <span v-if="icon" :class="iconClass"></span>
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    // label: the button label
    label: { type: String, default: () => '', required: true },

    // type: the type of the button. Button by default.
    type: { type: String, default: () => 'button' },

    // icon: the icon to be shown (optional)
    icon: { type: String, default: () => '' },

    // hover-flag: substitute the icon with the outline version on mouse hover. True by default.
    hoverFlag: { type: Boolean, default: () => true },
  },
  data() {
    return {
      // Icon class curretly shown
      iconClass: this.icon,
    }
  },
  methods: {
    // Substitute the standard icon with the outlined one
    outlineIcon() {
      this.iconClass = this.hoverFlag ? this.icon + '-outline' : this.icon
    },

    // Substitute the outlined icon with the standard one
    solidIcon() {
      this.iconClass = this.icon
    },
  },
}
</script>

<style scoped>
/* Appearance of the button */
button {
  background-color: #212121;
  color: white;
  padding: 9px;
  border: 2px solid #212121;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  font-weight: 500;
  text-decoration: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
button:hover {
  background-color: transparent;
  color: #212121;
}
</style>
