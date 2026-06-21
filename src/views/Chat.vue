<template>
  <div class="chat-container">
    <Sidebar />
    <div class="chat-main">
      <ChatHeader />
      <div ref="messagesContainer" class="chat-messages">
        <template v-if="currentMessages.length > 0">
          <ChatMessage
            v-for="msg in currentMessages"
            :key="msg.id"
            :message="msg"
            :format-time="formatTime"
          />
        </template>
        <div v-else class="empty-state">
          <div class="empty-icon">💬</div>
          <p class="empty-text">暂无消息，开始聊天吧</p>
        </div>
      </div>
      <ChatInput @send="handleSend" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import ChatHeader from '@/components/ChatHeader.vue'
import ChatInput from '@/components/ChatInput.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import { useMessages } from '@/composables/useMessages'

const { currentMessages, currentChannelId, sendMessage, formatTime } = useMessages()

const messagesContainer = ref(null)

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function handleSend(content) {
  sendMessage(content)
}

watch([currentMessages, currentChannelId], () => {
  scrollToBottom()
}, { immediate: true, deep: true })
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--bg-primary);
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-chat);
  border-left: 1px solid var(--border-color);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  font-size: 16px;
}
</style>
