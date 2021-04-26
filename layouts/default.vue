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
  min-height: 90vh;
}
.section-container {
  display: flow-root;
  margin-left: 8vw;
  margin-right: 8vw;
}
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
p {
  text-align: justify;
}
figure img {
  border-radius: 20px;
}
</style>
