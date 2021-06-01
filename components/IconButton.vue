<!--
  Component: IconButton
  Description:  A button which contains only a mandatory icon and without any label.
                On mouse hover the icon is substituted with the outlined version (if not disabled via props)
  Props:
  ├── type: the type of the button. Button by default. 
  ├── aria-label: description of the action that the button performs, for accessibility purposes
  ├── icon: the icon to be shown
  └── hover-flag: substitute the icon with the outline version on mouse hover. True by default.
-->

<template>
  <button
    :type="type"
    :aria-label="ariaLabel"
    @mouseenter="outlineIcon()"
    @mouseleave="solidIcon()"
  >
    <span :class="iconClass"></span>
  </button>
</template>

<script>
export default {
  props: {
    /** type: the type of the button. Button by default. */
    type: { type: String, default: () => 'button' },

    /** aria-label: description of the action that the button performs, for accessibility purposes */
    ariaLabel: { type: String, default: () => '' },

    /** icon: the icon to be shown */
    icon: { type: String, default: () => '' },

    /** hover-flag: substitute the icon with the outline version on mouse hover. True by default. */
    hoverFlag: { type: Boolean, default: () => true },
  },
  data() {
    return {
      /** Icon class curretly shown */
      iconClass: this.icon,
    }
  },
  methods: {
    /** Substitute the standard icon with the outlined one */
    outlineIcon() {
      this.iconClass = this.hoverFlag ? this.icon + '-outline' : this.icon
    },

    /** Substitute the outlined icon with the standard one */
    solidIcon() {
      this.iconClass = this.icon
    },
  },
}
</script>

<style scoped>
/* Appearance of the button */

button {
  width: 40px;
  /*height: 30px;*/
  background: rgba(25, 141, 251, 1);
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 1px 2px 1pt 0.2pt #868686c7;
  padding: 5px 0px 5px 0px;
}

button:hover {
  background-color: transparent;
  color: #212121;
}
</style>
