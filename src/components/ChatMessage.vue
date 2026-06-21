<template>
  <div :class="['message-item', { self: isSelf }]">
    <div v-if="!isSelf" class="avatar">{{ message.senderAvatar }}</div>
    <div class="message-body">
      <div :class="['meta', { 'meta-right': isSelf }]">
        <span class="sender-name">{{ message.senderName }}</span>
        <span class="time">{{ formattedTime }}</span>
      </div>
      <div class="bubble-wrapper">
        <div :class="['bubble', { 'bubble-self': isSelf, 'bubble-other': !isSelf }]">
          <span class="bubble-text">{{ message.content }}</span>
        </div>
      </div>
    </div>
    <div v-if="isSelf" class="avatar">{{ message.senderAvatar }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  formatTime: {
    type: Function,
    required: true
  }
})

const chatStore = useChatStore()

const isSelf = computed(() => props.message.senderId === chatStore.currentUser.id)
const formattedTime = computed(() => props.formatTime(props.message.timestamp))
</script>

<style lang="scss" scoped>
.message-item {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  align-items: flex-start;

  &.self {
    flex-direction: row-reverse;

    .meta-right {
      justify-content: flex-end;
    }
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.message-body {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--text-secondary);
}

.sender-name {
  font-weight: 500;
}

.time {
  opacity: 0.7;
}

.bubble-wrapper {
  display: flex;
}

.message-item.self .bubble-wrapper {
  justify-content: flex-end;
}

.bubble {
  padding: 10px 14px;
  border-radius: 8px;
  position: relative;
  word-break: break-word;
  line-height: 1.5;
  font-size: 14px;
}

.bubble-self {
  background-color: var(--bubble-self);
  color: var(--bubble-text-self);
  border-top-right-radius: 2px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -6px;
    width: 0;
    height: 0;
    border-left: 6px solid var(--bubble-self);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
}

.bubble-other {
  background-color: var(--bubble-other);
  color: var(--bubble-text-other);
  border-top-left-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -6px;
    width: 0;
    height: 0;
    border-right: 6px solid var(--bubble-other);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
}

.bubble-text {
  white-space: pre-wrap;
}
</style>
