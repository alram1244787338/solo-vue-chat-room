<template>
  <div class="chat-input-container">
    <div class="input-toolbar">
      <button class="toolbar-btn" title="表情">😊</button>
      <button class="toolbar-btn" title="文件">📎</button>
      <button class="toolbar-btn" title="图片">🖼️</button>
    </div>
    <div class="input-area">
      <textarea
        ref="textareaRef"
        v-model="inputText"
        class="message-input"
        placeholder="输入消息... (Enter 发送，Shift+Enter 换行)"
        @keydown="handleKeydown"
        @compositionstart="startComposition"
        @compositionend="onCompositionEnd"
        @input="autoResize"
      ></textarea>
      <button
        class="send-btn"
        :disabled="!canSend"
        @click="doSend"
      >
        发送
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatInput } from '@/composables/useChatInput'

const emit = defineEmits(['send'])

const { inputText, isComposing, canSend, startComposition, endComposition, clearInput } = useChatInput()

const textareaRef = ref(null)

function doSend() {
  if (!canSend.value) return
  emit('send', inputText.value)
  clearInput()
  autoResize()
  textareaRef.value?.focus()
}

function onCompositionEnd() {
  endComposition()
  autoResize()
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey && !isComposing.value) {
    e.preventDefault()
    doSend()
  }
}

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}
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
  line-height: 1.5;
  resize: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--accent-green);
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
