export default {
  methods: {
    /** Navigate to a specified internal path */
    navigateTo(path) {
      this.$router.push(path)
    },
    /** Open and external link */
    navigateToExternal(path) {
      window.open(path, '_blank')
    },
  },
}

/*
How to use this in local components:
import RoutingMixins from '~/mixins/Routing.js'
export default {
  mixins: [RoutingMixins],
*/
