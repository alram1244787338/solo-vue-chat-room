import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from './theme'

const STORAGE_KEY = 'chat-room-theme'

describe('theme store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('初始加载', () => {
    it('localStorage 为空时默认是浅色主题', () => {
      localStorage.removeItem(STORAGE_KEY)
      const store = useThemeStore()
      expect(store.isDark).toBe(false)
    })

    it('localStorage 存了 "dark" 时加载为深色主题', () => {
      localStorage.setItem(STORAGE_KEY, 'dark')
      const store = useThemeStore()
      expect(store.isDark).toBe(true)
    })

    it('localStorage 存了 "light" 时加载为浅色主题', () => {
      localStorage.setItem(STORAGE_KEY, 'light')
      const store = useThemeStore()
      expect(store.isDark).toBe(false)
    })

    it('localStorage 存了损坏/非预期值时回退到浅色', () => {
      localStorage.setItem(STORAGE_KEY, 'corrupted-value')
      const store = useThemeStore()
      expect(store.isDark).toBe(false)
    })
  })

  describe('toggleTheme', () => {
    it('浅色切换为深色', () => {
      const store = useThemeStore()
      expect(store.isDark).toBe(false)
      store.toggleTheme()
      expect(store.isDark).toBe(true)
    })

    it('深色切换为浅色', () => {
      const store = useThemeStore()
      store.setTheme(true)
      expect(store.isDark).toBe(true)
      store.toggleTheme()
      expect(store.isDark).toBe(false)
    })

    it('切换后保存到 localStorage', () => {
      const store = useThemeStore()
      store.toggleTheme()
      expect(localStorage.getItem(STORAGE_KEY)).toBe('dark')
      store.toggleTheme()
      expect(localStorage.getItem(STORAGE_KEY)).toBe('light')
    })
  })

  describe('setTheme', () => {
    it('设置为深色', () => {
      const store = useThemeStore()
      store.setTheme(true)
      expect(store.isDark).toBe(true)
      expect(localStorage.getItem(STORAGE_KEY)).toBe('dark')
    })

    it('设置为浅色', () => {
      const store = useThemeStore()
      store.setTheme(false)
      expect(store.isDark).toBe(false)
      expect(localStorage.getItem(STORAGE_KEY)).toBe('light')
    })
  })

  describe('localStorage 异常处理', () => {
    it('localStorage.getItem 抛出错误时不崩溃', () => {
      const originalGetItem = localStorage.getItem
      vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new Error('Storage disabled')
      })
      const store = useThemeStore()
      expect(store.isDark).toBe(false)
      localStorage.getItem = originalGetItem
    })

    it('localStorage.setItem 抛出错误时不崩溃', () => {
      vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('Quota exceeded')
      })
      const store = useThemeStore()
      expect(() => store.toggleTheme()).not.toThrow()
      vi.restoreAllMocks()
    })
  })
})
