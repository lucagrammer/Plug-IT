<!--
  Component: Contact Form
  Description:  A contact form to contact the company. It manages internally 
                the storing of the messages inside the database
  Props:
  ├── heading: the heading of the form
  └── page-name: the page from which the form has been sent
-->

<template>
  <div class="contact-form-container">
    <!-- Heading of the form -->
    <h2 class="form-heading">{{ heading }}</h2>

    <!-- SEND MESSAGE INTERFACE: form to be filled -->
    <form v-if="currentInterface == 0" @submit="sendMessage">
      <input id="pageName" type="hidden" name="pageName" :value="pageName" />

      <!-- Textual fields of the form -->
      <div class="form">
        <div class="textual-fieldset">
          <div class="field">
            <label for="name">Name *</label>
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
          </div>
          <div class="field">
            <label for="surname">Surname *</label>
            <input
              id="surname"
              v-model="surname"
              type="text"
              name="surname"
              placeholder="Surname"
              required
            />
          </div>
          <div class="field">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div class="textual-fieldset">
          <div class="field">
            <label for="message">Message *</label>
            <textarea
              id="message"
              v-model="message"
              required
              name="message"
              maxlength="1000"
              placeholder="Write here your message"
            ></textarea>
          </div>
        </div>

        <!-- Checkboxes of the form -->
        <div class="checkbox-fieldset">
          <div class="field checkbox">
            <input
              id="privacy"
              v-model="privacy"
              type="checkbox"
              name="privacy"
              required
            />
            <label for="privacy">
              Accept privacy policy and terms of service *
            </label>
          </div>
          <div class="field checkbox">
            <input
              id="commercial"
              v-model="commercial"
              type="checkbox"
              name="commercial"
            />
            <label for="commercial">
              Accept the use of the provided data for commercial and marketing
              purposes
            </label>
          </div>
        </div>

        <!-- Form controls -->
        <div class="centered-button">
          <base-button type="send" label="Send message" icon="mdi mdi-send" />
        </div>
      </div>
    </form>

    <!-- SENDING INTERFACE: on message sentind -->
    <div v-if="currentInterface == 1">
      <p class="form-message sending">
        <span class="mdi mdi-email-sync"></span>Please wait<br />
        Your message is being sent...
      </p>
    </div>

    <!-- SUCCESSFULLY RESPONSE INTERFACE: on message correctly sent -->

    <div v-if="currentInterface == 2">
      <p class="form-message success">
        <span class="mdi mdi-email-check"></span>
        Your message has been sent correctly<br />
        You will receive a reply in the next few days
      </p>
      <div class="centered-button">
        <base-button
          label="Send a new message"
          icon="mdi mdi-email-plus"
          @click.native="clearForm"
        />
      </div>
    </div>

    <!-- ERROR RESPONSE INTERFACE: on error -->
    <div v-if="currentInterface == 3">
      <p class="form-message failed">
        <span class="mdi mdi-email-remove"></span>
        An error occured<br />
        Please try again later
      </p>
      <div class="centered-button">
        <base-button
          label="Try again"
          icon="mdi mdi-email-plus"
          @click.native="retry"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  props: {
    /** page-name: the page from which the form has been sent */
    pageName: { type: String, default: () => '', required: true },

    /** headign: the heading of the form */
    heading: { type: String, default: () => '', required: true },
  },
  data() {
    return {
      /** Current interface displayed for the form */
      currentInterface: 0,

      // Form fields
      name: null,
      surname: null,
      email: null,
      message: null,
      privacy: null,
      commercial: null,
    }
  },
  methods: {
    /** Send the message to the server updating the interface according to the outcome */
    sendMessage(e) {
      e.preventDefault()
      this.currentInterface = 1 // Display the loading interface
      this.$axios
        .post(`${process.env.BASE_URL}/api/message`, {
          name: this.name,
          surname: this.surname,
          email: this.email,
          subject: this.pageName,
          message: this.message,
          commercialFlag: !!this.commercial,
        })
        .then(() => {
          this.currentInterface = 2 // Display the success interface
        })
        .catch(() => {
          this.currentInterface = 3 // Display the error interface
        })
    },

    /** Display again the form to be filled in  */
    retry() {
      this.currentInterface = 0
    },

    /**  Clear the form and display it to the user */
    clearForm() {
      this.name = null
      this.surname = null
      this.message = null
      this.privacy = null
      this.commercial = null
      this.currentInterface = 0
    },
  },
}
</script>

<style scoped>
/* Center the form container */
.form {
  margin: auto;
  max-width: 650px;
}

/* Center the form heading and the messages */
.form-heading,
.form-message {
  text-align: center;
}

/* Form messages appearance */
.sending {
  color: rgb(151, 109, 1);
}
.success {
  color: rgb(2, 116, 2);
}
.failed {
  color: rgb(192, 0, 0);
}
.form-message .mdi {
  display: block;
  font-size: 35px;
}

/* Spacing between fields */
.field {
  margin-top: 8px;
  margin-bottom: 8px;
}

/* Layout of the labels of the textual fields */
.textual-fieldset label {
  width: 20%;
  min-width: 90px;
  display: inline-block;
  margin: 8px;
  font-weight: 500;
  vertical-align: top;
}

/* Layout of the labels of the checkboxes */
.checkbox-fieldset {
  margin-top: 15px;
}

/* Appearence of the input elements */
input[type='text'],
input[type='email'],
textarea {
  width: 70%;
  min-width: 110px;
  display: inline-block;
  border: 1px solid #212121;
  border-radius: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
}

/* Prevent textarea resize */
textarea {
  resize: none;
  height: 100px;
}

@media (max-width: 625px) {
  /* Full width input elements on small screens */
  input[type='text'],
  input[type='email'],
  textarea {
    width: -webkit-fill-available;
  }
}

/* Prevent blue borders on focus */
input:focus,
textarea:focus,
select:focus {
  outline-color: black;
  background: rgba(238, 238, 238, 0.9);
}
</style>
