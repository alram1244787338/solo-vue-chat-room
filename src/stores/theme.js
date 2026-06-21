import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'chat-room-theme'

function loadThemeFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'dark'
  } catch (e) {
    return false
  }
}

function saveThemeToStorage(isDark) {
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  } catch (e) {}
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(loadThemeFromStorage())

  watch(isDark, (val) => {
    saveThemeToStorage(val)
  }, { immediate: true })

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  function setTheme(dark) {
    isDark.value = dark
  }

  return {
    isDark,
    toggleTheme,
    setTheme
  }
})
