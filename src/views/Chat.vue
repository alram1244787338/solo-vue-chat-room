<template>
  <div class="chat-container">
    <Sidebar />
    <div class="chat-main">
      <ChatHeader />
      <div
        ref="messagesContainer"
        class="chat-messages"
        @scroll="onScroll"
      >
        <template v-if="isSwitching">
          <div class="loading-state">
            <div class="loading-spinner"></div>
          </div>
        </template>
        <template v-else-if="currentMessages.length > 0">
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

const { currentMessages, currentChannelId, isSwitching, sendMessage, formatTime } = useMessages()

const messagesContainer = ref(null)
const isAtBottom = ref(true)

function checkAtBottom() {
  const el = messagesContainer.value
  if (!el) return true
  const threshold = 30
  return el.scrollTop + el.clientHeight >= el.scrollHeight - threshold
}

function onScroll() {
  isAtBottom.value = checkAtBottom()
}

function scrollToBottom(force = false) {
  if (!force && !isAtBottom.value) return
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function handleSend(content) {
  sendMessage(content)
}

watch(currentMessages, () => {
  scrollToBottom(isAtBottom.value)
}, { deep: true })

watch(currentChannelId, () => {
  isAtBottom.value = true
  nextTick(() => {
    scrollToBottom(true)
  })
})
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

.loading-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-green);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
