<template>
  <div class="chat-container">
    <Sidebar />
    <div class="chat-main">
      <ChatHeader />
      <div class="chat-messages">
        <div class="empty-state">
          <div class="empty-icon">💬</div>
          <p class="empty-text">暂无消息，开始聊天吧</p>
        </div>
      </div>
      <ChatInput />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import ChatHeader from '@/components/ChatHeader.vue'
import ChatInput from '@/components/ChatInput.vue'
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
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
