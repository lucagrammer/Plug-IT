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

/* Margin to avoid overlap between navbar and nuxt component */
#__nuxt {
  margin-top: 70px;
}

/* Content containers */
.page-container {
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
</style>
