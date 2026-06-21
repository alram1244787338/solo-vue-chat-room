import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'

export function useMessages() {
  const chatStore = useChatStore()

  const currentChannelId = computed(() => chatStore.currentChannel)

  const isSwitching = computed(() => chatStore.isSwitchingChannel)

  const currentMessages = computed(() => {
    return chatStore.getMessages(currentChannelId.value)
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

    chatStore.addMessage(currentChannelId.value, message)
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
    isSwitching,
    sendMessage,
    formatTime
  }
}
