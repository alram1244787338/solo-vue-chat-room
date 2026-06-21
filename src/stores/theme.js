import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'chat-room-theme'

export function loadThemeFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'dark'
  } catch (e) {
    return false
  }
}

export function saveThemeToStorage(isDark) {
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  } catch (e) {}
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(loadThemeFromStorage())

  function toggleTheme() {
    isDark.value = !isDark.value
    saveThemeToStorage(isDark.value)
  }

  function setTheme(dark) {
    isDark.value = dark
    saveThemeToStorage(isDark.value)
  }

  return {
    isDark,
    toggleTheme,
    setTheme
  }
})
