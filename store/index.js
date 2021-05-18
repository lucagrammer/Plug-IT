import Vue from 'vue'

export const state = () => {
  return {
    messages: [],
  }
}

export const mutations = {
  addMessage(state, message) {
    const messages = state.messages
    messages.push(message)
    Vue.set(state, 'messages', messages)
  },
}
