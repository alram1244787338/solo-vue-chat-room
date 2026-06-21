<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="user-avatar">👤</div>
    </div>
    <div class="channel-list">
      <div
        v-for="channel in chatStore.channels"
        :key="channel.id"
        :class="['channel-item', { active: chatStore.currentChannel === channel.id }]"
        @click="chatStore.switchChannel(channel.id)"
      >
        <span class="channel-icon">#</span>
        <span class="channel-name">{{ channel.name }}</span>
        <span v-if="channel.unread > 0" class="unread-badge">{{ channel.unread }}</span>
      </div>
    </div>
    <div class="sidebar-footer">
      <router-link to="/settings" class="settings-btn">
        ⚙️
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  height: 100%;
  background-color: var(--bg-sidebar);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.channel-list {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}

.channel-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: var(--text-sidebar-secondary);
  cursor: pointer;
  transition: all 0.2s;
  gap: 8px;

  &:hover {
    background-color: var(--bg-sidebar-hover);
    color: var(--text-sidebar);
  }

  &.active {
    background-color: var(--bg-sidebar-active);
    color: var(--text-sidebar);
  }
}

.channel-icon {
  font-size: 16px;
  opacity: 0.7;
}

.channel-name {
  flex: 1;
  font-size: 14px;
}

.unread-badge {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background-color: var(--accent-red);
  color: white;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.settings-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text-sidebar-secondary);
  transition: all 0.2s;

  &:hover {
    background-color: var(--bg-sidebar-hover);
    color: var(--text-sidebar);
  }
}
</style>
