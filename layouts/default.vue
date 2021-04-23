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
html {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

#__nuxt {
  margin-top: 70px;
}
.page-container {
  padding: 10px;
  margin-left: 8vw;
  margin-right: 8vw;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

a {
  text-decoration: none;
}
</style>
