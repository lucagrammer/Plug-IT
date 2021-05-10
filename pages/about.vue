<template>
  <main class="page-container">
    <section class="section-container">
      <breadcrumb current-page="About" />

      <!-- OUR HISTORY PARAGRAPH 1 -->
      <paragraph
        image="/about/hq.jpg"
        image-cap="Glass facade of the building of our headquarter located in Milan under blue sky during daytime."
        position="right"
      >
        <h2>Our History</h2>
        <p>
          Created by the merger of CSC and the Enterprise Services business of
          Hewlett Packard Enterprise, Plug-IT boasts a long and proud history of
          innovation, service and value.
        </p>
        <ul>
          <li>
            In <i>1959</i>, <b>Electronic Data Systems</b> was founded in
            Dallas, Texas, by Ross Perot. EDS, a pioneer in IT outsourcing, grew
            from Perot’s initial $1,000 investment to a global enterprise that
            helped 500 million passengers board planes and processed 13 billion
            credit card transactions. <br />
            Hewlett Packard acquired Electronic Data Systems in 2008.
          </li>
        </ul>
      </paragraph>

      <!-- OUR HISTORY PARAGRAPH 2 -->
      <paragraph
        image="/about/offices.jpg"
        image-cap="Man and woman sitting on table inside the offices of Plug-IT in Milan"
        position="left"
      >
        <ul>
          <li>
            In <i>1962</i>, computer analysts Roy Nutt and Fletcher Jones pooled
            $100 to form <b>CSC</b>, providing computer manufacturers with
            complex programs known as assemblers, compilers and operating
            systems. <br />
            During the next five decades, CSC grew rapidly to serve governments
            and enterprises worldwide. CSC became Plug-IT in 1995.
          </li>
          <li>
            <i>Today</i>, <b>Plug-IT</b> helps global companies run their
            mission critical systems and operations while modernizing IT,
            optimizing data architectures, and ensuring security and scalability
            across public, private and hybrid clouds. <br />
          </li>
        </ul>
        <p>
          With around <i><b>$20 billion</b></i> in annual revenues and nearly
          6,000 customers in more than <i><b>70 countries</b></i
          >, Plug-IT is uniquely positioned to lead business transformations —
          creating greater value for customers, partners and shareholders as
          well as presenting new growth opportunities for its people.
        </p>
      </paragraph>

      <!-- OUR VALUES PARAGRAPH -->
      <paragraph
        image="/about/people.jpg"
        image-cap="Man standing in front of people sitting beside table with laptop computers during a meeting"
        position="right"
      >
        <h2>Our Values</h2>
        <p>
          Plug-IT runs <i><b>mission-critical systems</b></i> with the latest
          technology innovations to deliver better business outcomes and new
          levels of performance, competitiveness and experiences for our
          customers.
        </p>
        <p>
          The criticality of the IT estate is top of mind for customers across
          all industries. They need to manage previous investments in enterprise
          infrastructure and also move some of their IT estate to the cloud.
        </p>
        <p>
          Our <i><b>focus is on IT modernization</b></i> including on-premises
          and cloud, data-driven operations and workplace modernization. Plug-IT
          is in a perfect position to help customers manage their IT estate with
          the scope and scale of services in the Enterprise Technology Stack.
        </p>
      </paragraph>
      <div class="button-container">
        <base-button
          label="Contact us"
          icon="mdi mdi-email"
          @click.native="navigateTo('/contacts')"
        />
      </div>
    </section>
  </main>
</template>

<script>
import Paragraph from '~/components/Paragraph.vue'
import RoutingMixins from '~/mixins/Routing.js'
export default {
  components: {
    Paragraph,
  },
  mixins: [RoutingMixins],
  head() {
    return {
      title: 'Plug-IT | About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A brief overview of the history and values behind Plug-IT. Founded in 1996, Plug-IT is a technology company focused on the definition and development of business models enabled by new technological and communication paradigms, such as Security, Business Management, Artificial Intelligence, Education and Internet of Things',
        },
      ],
    }
  },
}
</script>

<style scoped>
.button-container {
  position: relative;
  width: 100%;
}
button {
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
</style>
