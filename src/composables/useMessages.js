import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { formatTime as formatTimeUtil } from '@/utils/format'

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

  const formatTime = formatTimeUtil

  return {
    currentMessages,
    currentChannelId,
    isSwitching,
    sendMessage,
    formatTime
  }
}
