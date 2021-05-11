<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb current-page="Contacts" />
      <map-view>
        <h2>Our Offices</h2>
        <p>
          <span class="mdi mdi-map-marker"></span> Via Valtellina, 110
          <br />
          20144 Milano, Italia
        </p>
        <div class="phone-number">
          <span class="mdi mdi-phone"></span> Tel:
          <a href="tel:+393347711504"> +39 334 7711504</a>
        </div>
        <div class="phone-number">
          <span class="mdi mdi-fax"></span> Fax:
          <a href="fax:+393347711504">+39 011 7400016</a>
        </div>
      </map-view>
    </section>
    <hr />
    <contact-form heading="Get in touch" page-name="contacts" />
  </main>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import ContactForm from '~/components/ContactForm.vue'
import MapView from '~/components/MapView.vue'
export default {
  components: { MapView, ContactForm, Breadcrumb },
  head() {
    return {
      title: 'Plug-IT | Contacts',
    }
  },
}
</script>

<style scoped></style>
