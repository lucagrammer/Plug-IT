<!--
  Component: Paragraph
  Description: A general purpose paragraph with an (optional) image
  Named slots: 
  └── default slot: paragraph's text
  Props:
  ├── image: image for the paragraphs (optional)
  ├── image-cap: alt attribute of the image for SEO purposes (optional)
  └── postion: position of the paragraph's text. Either 'right' or 'left'. Right by default (optional)
-->

<template>
  <form action="/messagesubmit" method="post">
    <input type="hidden" id="pageName" name="pageName" :value="pageName" />
    <table>
      <tr>
        <td><label for="name">Name:</label></td>
        <td>
          <input
            type="text"
            name="name"
            placeholder="Insert name"
            id="name"
            required
          />
        </td>
      </tr>

      <tr>
        <td><label for="surname">Surname:</label></td>
        <td>
          <input
            type="text"
            name="surname"
            placeholder="Insert surname"
            id="surname"
            required
          />
        </td>
      </tr>

      <tr>
        <td><label for="mail">E-Mail:</label></td>
        <td>
          <input
            type="mail"
            name="mail"
            placeholder="Insert your e-mail address"
            id="mail"
            required
          />
        </td>
      </tr>

      <tr>
        <td><label for="message">Message:</label></td>
        <td>
          <textarea
            id="message"
            required
            name="message"
            maxlength="1000"
            placeholder="Write here your message"
          ></textarea>
        </td>
      </tr>
    </table>
    <input type="checkbox" name="privacy" id="privacy" /><label for="privacy"
      >I agree with the privacy policy</label
    >
    <br />
    <input type="checkbox" name="commercial" id="commercial" /><label
      for="commercial"
      >I'd like to subscribe to the newsletter</label
    >
    <div><base-button label="Send" icon="mdi mdi-send" /></div>
  </form>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  props: {
    pageName: { type: String, default: () => '' },
  },
}
</script>

<style scoped>
table {
  width: 400px;
}
table label,
table input,
table textarea {
  width: 100%;
}

@media (max-width: 400px) {
  table,
  table thead,
  table tbody,
  table tfoot,
  table tr,
  table td,
  table th,
  table caption {
    display: block;
  }
}
</style>
