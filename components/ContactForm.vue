<!--
  Component: Contact Form
  Description: A contact form to contact the company
  Props:
  └── page-name: the page from which the form has been sent
-->

<template>
  <form action="/messagesubmit" method="post">
    <input id="pageName" type="hidden" name="pageName" :value="pageName" />
    <table>
      <tbody>
        <tr>
          <td><label for="name">Name:</label></td>
          <td>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Insert name"
              required
            />
          </td>
        </tr>

        <tr>
          <td><label for="surname">Surname:</label></td>
          <td>
            <input
              id="surname"
              type="text"
              name="surname"
              placeholder="Insert surname"
              required
            />
          </td>
        </tr>

        <tr>
          <td><label for="mail">E-Mail:</label></td>
          <td>
            <input
              id="mail"
              type="mail"
              name="mail"
              placeholder="Insert your e-mail address"
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
      </tbody>
    </table>
    <input id="privacy" type="checkbox" name="privacy" /><label for="privacy"
      >I agree with the privacy policy</label
    >
    <br />
    <input id="commercial" type="checkbox" name="commercial" /><label
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
    pageName: { type: String, default: () => '', required: true },
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
