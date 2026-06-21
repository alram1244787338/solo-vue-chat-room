<template>
  <div class="chat-header">
    <div class="channel-info">
      <span class="channel-icon">#</span>
      <span class="channel-name">{{ currentChannelInfo.name }}</span>
    </div>
    <div class="header-actions">
      <button class="action-btn" title="搜索">🔍</button>
      <button class="action-btn" title="成员">👥</button>
      <button class="action-btn" @click="themeStore.toggleTheme()" title="切换主题">
        {{ themeStore.isDark ? '☀️' : '🌙' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useThemeStore } from '@/stores/theme'

const chatStore = useChatStore()
const themeStore = useThemeStore()

const currentChannelInfo = computed(() => {
  return chatStore.channels.find(c => c.id === chatStore.currentChannel) || { name: '未知频道' }
})
</script>

<style lang="scss" scoped>
.chat-header {
  height: 56px;
  padding: 0 20px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.channel-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.channel-icon {
  font-size: 18px;
  color: var(--text-secondary);
}

.channel-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  color: var(--text-secondary);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
  }
}
</style>
