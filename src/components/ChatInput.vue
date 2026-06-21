<template>
  <div class="chat-input-container">
    <div class="input-toolbar">
      <button class="toolbar-btn" title="表情">😊</button>
      <button class="toolbar-btn" title="文件">📎</button>
      <button class="toolbar-btn" title="图片">🖼️</button>
    </div>
    <div class="input-area">
      <textarea
        v-model="inputText"
        class="message-input"
        placeholder="输入消息..."
        :disabled="true"
        @keydown.enter.prevent
      ></textarea>
      <button class="send-btn" :disabled="true">
        发送
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputText = ref('')
</script>

<style lang="scss" scoped>
.chat-input-container {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 12px 16px;
}

.input-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.toolbar-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: transparent;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--bg-tertiary);
  }
}

.input-area {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.message-input {
  flex: 1;
  min-height: 60px;
  max-height: 120px;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-input);
  color: var(--text-primary);
  font-size: 14px;
  resize: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--accent-green);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-tertiary);
  }
}

.send-btn {
  padding: 10px 24px;
  border-radius: 6px;
  background-color: var(--accent-green);
  color: white;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--accent-green-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
