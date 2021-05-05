export default {
  methods: {
    // Navigate to a specified path
    navigateTo(path) {
      this.$router.push(path)
    },
    // Open link
    navigateToExternal(path) {
      window.open('https://' + path, '_blank')
    },
  },
}

/*
How to use this in local components:
import RoutingMixins from '~/mixins/Routing.js'
export default {
  mixins: [RoutingMixins],
*/
