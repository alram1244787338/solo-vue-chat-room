import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'

export function useMessages() {
  const chatStore = useChatStore()

  const currentChannelId = computed(() => chatStore.currentChannel)

  const currentMessages = computed(() => {
    return chatStore.messagesByChannel[currentChannelId.value] || []
  })

  function sendMessage(content) {
    if (!content.trim()) return

    const message = {
      id: Date.now().toString(),
      channelId: currentChannelId.value,
      content: content.trim(),
      senderId: chatStore.currentUser.id,
      senderName: chatStore.currentUser.name,
      senderAvatar: chatStore.currentUser.avatar,
      timestamp: Date.now()
    }

    if (!chatStore.messagesByChannel[currentChannelId.value]) {
      chatStore.messagesByChannel[currentChannelId.value] = []
    }
    chatStore.messagesByChannel[currentChannelId.value].push(message)
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return {
    currentMessages,
    currentChannelId,
    sendMessage,
    formatTime
  }
}
