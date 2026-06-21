import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const currentChannel = ref('general')
  const channels = ref([
    { id: 'general', name: '综合讨论', unread: 0 },
    { id: 'tech', name: '技术交流', unread: 0 },
    { id: 'random', name: '随便聊聊', unread: 0 }
  ])
  const messages = ref([])

  function switchChannel(channelId) {
    currentChannel.value = channelId
  }

  return {
    currentChannel,
    channels,
    messages,
    switchChannel
  }
})
