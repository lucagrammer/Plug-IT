<template>
  <main class="container">
    <header>
      <h1>About what?</h1>
      <h4>About this website.</h4>
      <img
        src="https://pbs.twimg.com/profile_images/1090208956440633345/Okg4uYbh_400x400.jpg"
        alt="Nuxt Logo"
      />
    </header>
    <section>
      <h2>Another lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
    </section>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: 'A WebSite - About',
    }
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
h4 {
  margin-bottom: 30px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
}
</style>
