<template>
  <div class="settings-container">
    <div class="settings-header">
      <router-link to="/chat" class="back-btn">
        ← 返回
      </router-link>
      <h1 class="settings-title">设置</h1>
    </div>
    <div class="settings-content">
      <div class="settings-card">
        <div class="settings-item">
          <span class="settings-label">深色模式</span>
          <button @click="themeStore.toggleTheme()" class="theme-toggle">
            {{ themeStore.isDark ? '🌙 开启' : '☀️ 关闭' }}
          </button>
        </div>
      </div>
      <div class="settings-card">
        <p class="settings-placeholder">更多设置功能开发中...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style lang="scss" scoped>
.settings-container {
  width: 100%;
  height: 100%;
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
}

.settings-header {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  gap: 16px;
}

.back-btn {
  color: var(--accent-blue);
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--bg-tertiary);
  }
}

.settings-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.settings-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.settings-card {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--border-light);
}

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.settings-label {
  font-size: 15px;
  color: var(--text-primary);
}

.theme-toggle {
  padding: 8px 16px;
  border-radius: 6px;
  background-color: var(--accent-green);
  color: white;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-green-hover);
  }
}

.settings-placeholder {
  color: var(--text-secondary);
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
}
</style>
