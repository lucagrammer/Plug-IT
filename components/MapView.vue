<!--
  Component: MapView
  Description:  A Google map view with a description. Based on the Google My Maps.
                It requires the identifier of the map and a slot to be shown as description.
  Named slots: 
  └── default slot: what to display next to the map view
  Props:
  └── map-id: the Google My Map identifier. By default is set to the Plug-IT HQ map
-->

<template>
  <section class="map-view-container">
    <!-- Map view  -->
    <div class="map-container">
      <iframe title="Google Map" class="map" :src="mapUrl"></iframe>
    </div>

    <!-- Description slot -->
    <div class="address-container">
      <address>
        <slot> </slot>
      </address>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    /** map-id: the Google My Map identifier. By default is set to the Plug-IT HQ map */
    mapId: { type: String, default: () => '1xRytj_13i84wCH0axdS4uMCM_YuJKiJ4' },
  },
  data() {
    return { mapUrl: '' }
  },
  mounted() {
    this.mapUrl = `https://www.google.com/maps/d/embed?mid=${this.mapId}`
  },
}
</script>

<style scoped>
/* Containers components */
.map-view-container {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  width: 100%;
  display: flow-root;
}
.map-container,
.address-container {
  position: relative;
  width: 100%;
}

/* Additional spacing between address and map */
address {
  font-style: normal;
  padding-left: 2em;
}

/* Prevent huge margin top space, as the whole component is already spaced apart */
address :first-child {
  margin-top: 0px;
}

/* Styling of the slot components */
p {
  margin-top: 0px;
  margin-bottom: 50px;
}
h2,
h3 {
  margin-bottom: 0px;
}

/* Map layout */
.map {
  width: 100%;
  border-radius: 20px;
  height: 290px;
  border: none;
}

.map-container * {
  display: block;
}

/* Grid management for mobile devices */
@media (min-width: 726px) {
  .map-container,
  .address-container {
    float: left;
  }
  .address-container {
    width: 30%;
  }
  .map-container {
    width: 70%;
  }
}
/* Grid management for desktop devices */
@media (max-width: 725px) {
  .map {
    max-height: 70vh;
  }
  address {
    padding-left: 0px;
  }
  /* Revert the margin for the first element */
  address :first-child {
    margin-top: revert;
  }
}
</style>
