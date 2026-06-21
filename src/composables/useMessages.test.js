import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMessages } from './useMessages'
import { useChatStore } from '@/stores/chat'

describe('useMessages', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('currentMessages', () => {
    it('返回当前频道的消息列表', () => {
      const { currentMessages } = useMessages()
      expect(Array.isArray(currentMessages.value)).toBe(true)
      expect(currentMessages.value.length).toBeGreaterThan(0)
    })

    it('切换频道后返回对应频道的消息', () => {
      const chatStore = useChatStore()
      const { currentMessages } = useMessages()

      const generalCount = currentMessages.value.length

      chatStore.switchChannel('tech')
      expect(currentMessages.value.length).not.toBe(generalCount)
      currentMessages.value.forEach(m => {
        expect(m.channelId).toBe('tech')
      })
    })

    it('空频道返回空数组', () => {
      const chatStore = useChatStore()
      const { currentMessages } = useMessages()

      chatStore.switchChannel('random')
      expect(currentMessages.value).toEqual([])
    })
  })

  describe('sendMessage', () => {
    it('正常发送：内容被追加到当前频道', () => {
      const chatStore = useChatStore()
      const { currentMessages, sendMessage } = useMessages()

      chatStore.switchChannel('general')
      const beforeCount = currentMessages.value.length

      sendMessage('你好世界')
      expect(currentMessages.value.length).toBe(beforeCount + 1)

      const lastMsg = currentMessages.value.at(-1)
      expect(lastMsg.content).toBe('你好世界')
      expect(lastMsg.senderId).toBe('me')
      expect(lastMsg.senderName).toBe('我')
      expect(lastMsg.channelId).toBe('general')
      expect(typeof lastMsg.id).toBe('string')
      expect(typeof lastMsg.timestamp).toBe('number')
    })

    it('空内容不发送', () => {
      const { currentMessages, sendMessage } = useMessages()
      const beforeCount = currentMessages.value.length

      sendMessage('')
      expect(currentMessages.value.length).toBe(beforeCount)
    })

    it('纯空格内容不发送', () => {
      const { currentMessages, sendMessage } = useMessages()
      const beforeCount = currentMessages.value.length

      sendMessage('   ')
      expect(currentMessages.value.length).toBe(beforeCount)
    })

    it('换行符内容不发送', () => {
      const { currentMessages, sendMessage } = useMessages()
      const beforeCount = currentMessages.value.length

      sendMessage('\n\n')
      expect(currentMessages.value.length).toBe(beforeCount)
    })

    it('发送后内容自动 trim 前后空格', () => {
      const { currentMessages, sendMessage } = useMessages()

      sendMessage('  hello world  ')
      const lastMsg = currentMessages.value.at(-1)
      expect(lastMsg.content).toBe('hello world')
    })

    it('向空频道（random）发送能正确追加', () => {
      const chatStore = useChatStore()
      const { currentMessages, sendMessage } = useMessages()

      chatStore.switchChannel('random')
      expect(currentMessages.value.length).toBe(0)

      sendMessage('random 的第一条')
      expect(currentMessages.value.length).toBe(1)
      expect(currentMessages.value[0].content).toBe('random 的第一条')
    })

    it('只影响当前频道，不污染其他频道', () => {
      const chatStore = useChatStore()
      const { currentMessages, sendMessage } = useMessages()

      chatStore.switchChannel('general')
      const generalBefore = currentMessages.value.length

      chatStore.switchChannel('tech')
      sendMessage('只在 tech 频道')

      chatStore.switchChannel('general')
      expect(currentMessages.value.length).toBe(generalBefore)
    })
  })

  describe('currentChannelId', () => {
    it('返回当前频道 ID', () => {
      const { currentChannelId } = useMessages()
      expect(currentChannelId.value).toBe('general')
    })

    it('切换频道时同步更新', () => {
      const chatStore = useChatStore()
      const { currentChannelId } = useMessages()

      chatStore.switchChannel('tech')
      expect(currentChannelId.value).toBe('tech')
    })
  })

  describe('formatTime', () => {
    it('是一个函数', () => {
      const { formatTime } = useMessages()
      expect(typeof formatTime).toBe('function')
    })

    it('返回 HH:MM 格式', () => {
      const { formatTime } = useMessages()
      const ts = new Date(2025, 0, 1, 14, 30).getTime()
      const result = formatTime(ts)
      expect(result).toMatch(/^\d{2}:\d{2}$/)
    })
  })
})
