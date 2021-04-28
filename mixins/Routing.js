export default {
  methods: {
    // Navigate to a specified path
    navigateTo(path) {
      this.$router.push(path)
    },
  },
}

/*
How to use this in local components:
import RoutingMixins from '~/mixins/Routing.js'
export default {
  mixins: [RoutingMixins],
*/
