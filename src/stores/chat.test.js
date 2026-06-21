import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChatStore } from './chat'

describe('chat store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('getMessages', () => {
    it('频道存在时返回消息数组', () => {
      const store = useChatStore()
      const messages = store.getMessages('general')
      expect(Array.isArray(messages)).toBe(true)
      expect(messages.length).toBeGreaterThan(0)
    })

    it('频道不存在时返回空数组', () => {
      const store = useChatStore()
      const messages = store.getMessages('nonexistent-channel')
      expect(Array.isArray(messages)).toBe(true)
      expect(messages.length).toBe(0)
    })

    it('空频道（random）返回空数组', () => {
      const store = useChatStore()
      const messages = store.getMessages('random')
      expect(messages).toEqual([])
    })
  })

  describe('addMessage', () => {
    it('向已有频道追加消息', () => {
      const store = useChatStore()
      const beforeCount = store.getMessages('general').length
      const newMsg = {
        id: 'test-1',
        content: '测试消息',
        senderId: 'me',
        senderName: '我',
        timestamp: Date.now()
      }
      store.addMessage('general', newMsg)
      const afterCount = store.getMessages('general').length
      expect(afterCount).toBe(beforeCount + 1)
      const lastMsg = store.getMessages('general').at(-1)
      expect(lastMsg.content).toBe('测试消息')
      expect(lastMsg.id).toBe('test-1')
    })

    it('向空频道追加消息（新建频道）', () => {
      const store = useChatStore()
      expect(store.getMessages('random').length).toBe(0)
      const newMsg = {
        id: 'test-random-1',
        content: '随便聊聊第一条',
        senderId: 'alice',
        senderName: 'Alice',
        timestamp: Date.now()
      }
      store.addMessage('random', newMsg)
      const messages = store.getMessages('random')
      expect(messages.length).toBe(1)
      expect(messages[0].content).toBe('随便聊聊第一条')
    })

    it('向完全不存在的频道追加消息（自动创建）', () => {
      const store = useChatStore()
      const newMsg = {
        id: 'test-new-1',
        content: '新频道消息',
        senderId: 'bob',
        senderName: 'Bob',
        timestamp: Date.now()
      }
      store.addMessage('brand-new-channel', newMsg)
      const messages = store.getMessages('brand-new-channel')
      expect(messages.length).toBe(1)
      expect(messages[0].senderId).toBe('bob')
    })

    it('messagesByChannel 响应式更新：push 后数组长度变化', () => {
      const store = useChatStore()
      const initial = store.messagesByChannel.general.length
      store.addMessage('general', { id: 'x', content: 'hi', senderId: 'me', senderName: '我', timestamp: 0 })
      expect(store.messagesByChannel.general.length).toBe(initial + 1)
    })
  })

  describe('switchChannel', () => {
    it('默认频道是 general', () => {
      const store = useChatStore()
      expect(store.currentChannel).toBe('general')
    })

    it('切换到其他频道', () => {
      const store = useChatStore()
      store.switchChannel('tech')
      expect(store.currentChannel).toBe('tech')
    })

    it('切换频道后 getMessages 返回对应频道消息', () => {
      const store = useChatStore()
      store.switchChannel('tech')
      const msgs = store.getMessages(store.currentChannel)
      expect(msgs.length).toBeGreaterThan(0)
      msgs.forEach(m => {
        expect(m.channelId).toBe('tech')
      })
    })

    it('相同频道 no-op：不触发 isSwitchingChannel 变化', () => {
      const store = useChatStore()
      expect(store.isSwitchingChannel).toBe(false)
      store.switchChannel('general')
      expect(store.isSwitchingChannel).toBe(false)
      expect(store.currentChannel).toBe('general')
    })

    it('不同频道切换时 isSwitchingChannel 短暂为 true', () => {
      return new Promise((resolve) => {
        const store = useChatStore()
        store.switchChannel('tech')
        expect(store.isSwitchingChannel).toBe(true)
        setTimeout(() => {
          expect(store.isSwitchingChannel).toBe(false)
          expect(store.currentChannel).toBe('tech')
          resolve()
        }, 120)
      })
    })
  })

  describe('currentUser', () => {
    it('初始用户是"我"', () => {
      const store = useChatStore()
      expect(store.currentUser.id).toBe('me')
      expect(store.currentUser.name).toBe('我')
    })

    it('allUsers 包含多个模拟用户', () => {
      const store = useChatStore()
      expect(store.allUsers.length).toBeGreaterThanOrEqual(4)
      const ids = store.allUsers.map(u => u.id)
      expect(ids).toContain('alice')
      expect(ids).toContain('bob')
      expect(ids).toContain('charlie')
    })
  })
})
