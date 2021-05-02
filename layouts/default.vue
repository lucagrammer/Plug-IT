<template>
  <div>
    <the-header></the-header>
    <Nuxt />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'
export default {
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style>
/* Font family for the whole website */
html {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

/* Content containers */
.page-container {
  margin-top: 70px;
  min-height: 90vh;
  margin-bottom: 50px;
}
.section-container {
  display: flow-root;
  margin-left: 8vw;
  margin-right: 8vw;
}

/* Appearance of the main elements */
a {
  text-decoration: none;
  color: black;
}
.disabled-link {
  cursor: initial;
}
hr {
  border: none;
  border-top: #212121 solid 2px;
  width: 100%;
}
figure img {
  border-radius: 20px;
}
address span {
  font-size: 1.5em;
}
address a {
  display: inline-block;
  margin-bottom: 5px;
}

/* Flow up animation for page opening */
@keyframes flowUp {
  from {
    opacity: 0;
    transform: translate3d(0%, 100%, 0); /* traslazione x,y,z*/
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.page-enter-active {
  animation: flowUp 0.2s;
}
</style>
