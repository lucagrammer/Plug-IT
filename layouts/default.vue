<template>
  <div>
    <the-header></the-header>
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
export default {
  components: {
    TheHeader,
  },
}
</script>

<style>
html {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  padding: 10px;
  margin: 40px auto;
  max-width: 800px;
  text-align: center;
}
a {
  color: white;
}
img {
  width: 100%;
}
</style>
