<template>
  <div>
    <the-header></the-header>
    <Nuxt />
    <chat :chat-list="list" />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue'
import TheHeader from '~/components/TheHeader.vue'
import Chat from '~/components/Chat'
import MMCCMixin from '~/mixins/mmcc-mixin'
export default {
  components: {
    TheHeader,
    TheFooter,
    Chat,
  },
  mixins: [MMCCMixin],
}
</script>

<style>
/* Font family for the whole website */
html {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  letter-spacing: 0.4px;
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
a:hover {
  text-decoration: underline;
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
ul {
  padding-left: 20px;
  list-style-type: square;
}
li {
  margin-bottom: 20px;
}
.area-label {
  text-transform: uppercase;
}
.error-messages {
  text-align: center;
  margin-top: 30vh;
}

/* Styling for centered buttons */
.centered-button {
  text-align: center;
}

/* Flow up animation for page opening */
@keyframes flowUp {
  from {
    opacity: 0;
    transform: translate3d(0%, 25%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.page-enter-active {
  animation: flowUp 0.18s;
}
</style>
