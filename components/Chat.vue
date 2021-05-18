<template>
  <div class="chat">
    <div v-if="isOpen" class="chat-container">
      <div id="chat-window" class="chat-window">
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
      <input
        v-model="messageToSend"
        type="text"
        @keypress.enter="sendMessage"
      />
    </div>
    <div class="button" @click="isOpen = !isOpen">
      <img src="https://img.icons8.com/ios-filled/452/chat--v1.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      messageToSend: '',
      isOpen: true,
    }
  },
  methods: {
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

<style>
.button {
  height: 60px;
  width: 60px;
  border: 1px solid black;
  border-radius: 100%;
  padding: 10px;
  float: right;
}
.button img {
  width: 100%;
}
.chat-container {
  border: 1px solid black;
  border-radius: 4px;
  height: 500px;
  width: 300px;
  position: absolute;
  bottom: 80px;
  right: 0px;
}
.chat-window {
  overflow-y: scroll;
  height: calc(100% - 34px);
}
.message {
  width: calc(100% - 8px);
  display: flex;
  justify-content: flex-end;
}
.message.sender {
  justify-content: flex-start;
}
.message-content {
  padding: 5px 10px;
  margin: 4px;
  width: auto;
  background: #f3f3f3;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
}
.message-content.sender {
  background: black;
  color: white;
  border: 1px solid black;
}
input {
  width: 100%;
  position: absolute;
  z-index: 20;
}
</style>
