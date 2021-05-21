<!--
  Component: Chat
  Description:  A chat to interact with the chatbot of the website.
                
  Props:
  └── chat-list: array containing all the messages of the chat
-->

<template>
  <div class="chat">
    <div v-if="isOpen" class="chat-container">
      <div id="chat-window" ref="list" class="chat-window">
        <!-- CHAT MESSAGES -->
        <div
          v-for="(message, messageIndex) of chatList"
          :key="`message-${messageIndex}`"
          class="message"
          :class="{ sender: message.sender }"
        >
          <div class="message-content" :class="{ sender: message.sender }">
            {{ message.content }}
          </div>
        </div>
      </div>

      <!-- CHAT INPUT -->
      <div class="chat-input">
        <hr />
        <input
          v-model="messageToSend"
          type="text"
          aria-label="Your message to the chatbot. Press enter to send."
          placeholder="Write here your answer"
          @keypress.enter="sendMessage"
        />
      </div>
    </div>

    <!-- EXPAND/COLLAPSE CHAT ICON -->
    <div
      :class="isOpen ? 'chatbot-button pressed-button' : 'chatbot-button'"
      role="button"
      @click="isOpen = !isOpen"
    >
      <span
        v-if="!isOpen"
        class="mdi mdi-message-text"
        title="Open chat"
      ></span>
      <span v-else class="mdi mdi-close" title="Close chat"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** chat-list: array containing all the messages of the chat */
    chatList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      /** The message of the user */
      messageToSend: '',

      /** Visibility flag of the chat */
      isOpen: false,
    }
  },
  watch: {
    /** Scoll to last message in the chat */
    chatList() {
      const chatWindow = this.$refs.list
      if (chatWindow) {
        this.$nextTick().then(() => {
          chatWindow.scrollTo({
            top: chatWindow.scrollHeight,
            behavior: 'smooth',
          })
        })
      }
    },
  },
  methods: {
    /** Send the entered message to the chatbot */
    sendMessage() {
      const { WebSocketEventBus } = require('mmcc/WebSocketEventBus')
      this.$store.commit('addMessage', {
        sender: false,
        content: this.messageToSend,
      })
      const packet = {
        message: { type: 'data', payload: { data: this.messageToSend } },
        configurationId: process.env.configurationId,
      }
      WebSocketEventBus.$emit('send', packet)
      this.messageToSend = ''
    },
  },
}
</script>

<style scoped>
/* Component container */
.chat {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
}

/* Button to open/close the chatbot */
.chatbot-button {
  border: 2px solid black;
  float: right;
  margin-bottom: 10px;
  margin-right: 1.5vw;
  padding: 10px;
  height: 40px;
  width: 40px;
  background: rgba(229, 229, 229, 0.99);
  border-radius: 100%;
  cursor: pointer;
  text-align: center;
}
.pressed-button,
.chatbot-button:hover {
  background: rgba(255, 255, 255, 0.9);
}
.pressed-button:hover {
  background: rgba(229, 229, 229, 0.99);
}
.chatbot-button .mdi {
  font-size: 28px;
  line-height: 42px;
}

/* Styling for chat messages containers */
.chat-container {
  border: 2px solid black;
  background: rgba(255, 255, 255, 0.9);
  margin-right: 1.5vw;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
  height: 400px;
  max-height: 60vh;
  width: 300px;
  position: absolute;
  bottom: 80px;
  right: 0px;
}
.chat-window {
  overflow-y: scroll;
  height: calc(100% - 41px);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
}

/* Styling for messages and their containers */
.message {
  width: calc(100%);
  display: flex;
  justify-content: flex-end;
}
.message.sender {
  justify-content: flex-start;
}
.message-content {
  padding: 9px 13px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 4px;
  margin-bottom: 4px;
  width: auto;
  /* background: rgba(27, 130, 250); */
  background: rgb(68, 197, 245);
  background: linear-gradient(
    130deg,
    rgba(68, 197, 245, 1) 0%,
    rgba(25, 141, 251, 1) 100%
  );
  color: white;
  border: none;
  border-radius: 15px;
  box-shadow: 1px 2px 1pt 0.2pt #868686c7;
}
.message-content.sender {
  background: rgba(229, 229, 229);
  color: black;
}

/* Styling for input of the chat */
.chat-input {
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 8px;
}
input {
  width: 80%;
  background: rgb(68, 197, 245);
  background: linear-gradient(
    130deg,
    rgba(68, 197, 245, 1) 0%,
    rgba(25, 141, 251, 1) 100%
  );
  box-shadow: 1px 2px 1pt 0.2pt #868686c7;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 5px 15px 5px 15px;
}

/* Styling for placeholders to ensure readability */
::placeholder {
  color: white;
  opacity: 1;
}

/* Styling for text-selection to ensure readability */
::selection {
  background-color: rgb(124, 124, 147);
}

/* Prevent blue borders on focus */
input:focus {
  box-shadow: 0 0 1pt 1pt black;
  border-radius: 15px;
  outline: none;
}
</style>
