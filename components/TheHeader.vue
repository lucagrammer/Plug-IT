<!--
  Component: TheHeader
  Description: Header of the website with company logo and responsive navbar
-->

<template>
  <header class="header">
    <div class="header-content">
      <!-- Company Logo -->
      <nuxt-link to="/" class="logo">
        <img src="~/static/logo.png" alt="Plug-IT" />
      </nuxt-link>

      <!-- Desktop Navbar -->
      <nav class="desktop-nav">
        <div
          v-for="(item, itemIndex) of menuOptions"
          :key="'menu-item-' + itemIndex"
          class="menu-item"
        >
          <nuxt-link :to="item.path">
            {{ item.name }}
          </nuxt-link>
        </div>
      </nav>

      <!-- Mobile Navbar Commands -->
      <nav class="mobile-nav">
        <span
          v-if="!mobileMenuVisibility"
          class="mdi mdi-menu"
          title="Open menù"
          @click="changeMobileMenuVisibility"
        ></span>
        <span
          v-else
          class="mdi mdi-close"
          title="Close menù"
          @click="changeMobileMenuVisibility"
        ></span>
      </nav>
    </div>

    <!-- Mobile Navbar -->
    <nav
      v-if="mobileMenuVisibility"
      class="mobile-nav dropdown-list"
      @click="changeMobileMenuVisibility"
    >
      <div
        v-for="(item, itemIndex) of menuOptions"
        :key="'menu-item-' + itemIndex"
        class="menu-item"
      >
        <nuxt-link :to="item.path">
          {{ item.name }}
          <span :class="item.icon"></span>
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      /** Names and paths of the navbar elements */
      menuOptions: [
        {
          name: 'About',
          icon: 'mdi mdi-book-open-page-variant',
          path: '/about',
        },
        {
          name: 'People',
          icon: 'mdi mdi-account-group',
          path: '/people',
        },
        {
          name: 'Events',
          icon: 'mdi mdi-calendar-month',
          path: '/events',
        },
        {
          name: 'Areas',
          icon: 'mdi mdi-shape',
          path: '/areas',
        },
        {
          name: 'Our Services',
          icon: 'mdi mdi-view-grid',
          path: '/services',
        },
        {
          name: 'Contacts',
          icon: 'mdi mdi-email',
          path: '/contacts',
        },
      ],

      /** Expansion status of the mobile navbar menu */
      mobileMenuVisibility: false,
    }
  },
  methods: {
    /** Reduce/expand the dropdown menu of the mobile navbar */
    changeMobileMenuVisibility() {
      this.mobileMenuVisibility = !this.mobileMenuVisibility
    },
  },
}
</script>

<style scoped>
/* Positioning and colors of the whole component */
.header {
  position: fixed;
  width: 100vw;
  background: rgba(229, 229, 229, 0.9);
  height: 70px;
  top: 0;
  z-index: 90;
}

/* Foreground components black */
.header * {
  color: black;
}

/* Main header containers */
.header-content {
  height: inherit;
  margin-left: 8vw;
  margin-right: 8vw;
}
.header-content .mdi {
  font-size: 36px;
}
.header-content .menu-item {
  margin-left: 1.5vw;
}
.menu-item :hover {
  color: #47494e;
}

nav {
  align-items: center;
  height: inherit;
  float: right;
  display: flex;
  font-size: 20px;
}

/* Appearance of the mobile navbar elements */
.dropdown-list {
  display: block;
  width: 100vw;
  height: 100vh;
  background: rgba(238, 238, 238, 0.9);
  font-size: 28px;
}
.dropdown-list .mdi {
  vertical-align: bottom;
  margin-left: 5px;
}
.dropdown-list .menu-item {
  text-align: right;
  margin-right: 8vw;
  margin-top: 10px;
}

/* Appearance of the landmark to current page */
.nuxt-link-active {
  font-weight: 800;
}

/* Logo layout */
img {
  max-height: 45px;
  width: auto;
  float: left;
  margin-top: 12.5px;
  margin-bottom: 12.5px;
}
.logo {
  display: block;
}

/* Mobile navbar if viewport <=825 px */
@media screen and (max-width: 825px) {
  .desktop-nav {
    display: none;
  }
}
/* Desktop navbar if viewport >=826 px */
@media screen and (min-width: 826px) {
  .mobile-nav {
    display: none;
  }
}
</style>
