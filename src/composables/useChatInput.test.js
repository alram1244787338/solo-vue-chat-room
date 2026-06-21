import { describe, it, expect, beforeEach } from 'vitest'
import { useChatInput } from './useChatInput'

describe('useChatInput', () => {
  let composable

  beforeEach(() => {
    composable = useChatInput()
  })

  describe('初始状态', () => {
    it('inputText 初始为空字符串', () => {
      expect(composable.inputText.value).toBe('')
    })

    it('isComposing 初始为 false', () => {
      expect(composable.isComposing.value).toBe(false)
    })

    it('canSend 初始为 false', () => {
      expect(composable.canSend.value).toBe(false)
    })
  })

  describe('canSend 逻辑', () => {
    it('有内容 + 非组字 = true', () => {
      composable.setInputText('你好')
      composable.setComposing(false)
      expect(composable.canSend.value).toBe(true)
    })

    it('空内容 = false', () => {
      composable.setInputText('')
      composable.setComposing(false)
      expect(composable.canSend.value).toBe(false)
    })

    it('纯空格内容 = false', () => {
      composable.setInputText('   ')
      composable.setComposing(false)
      expect(composable.canSend.value).toBe(false)
    })

    it('只有换行符 = false', () => {
      composable.setInputText('\n\n')
      composable.setComposing(false)
      expect(composable.canSend.value).toBe(false)
    })

    it('有内容 + 组字中 = false', () => {
      composable.setInputText('你好')
      composable.setComposing(true)
      expect(composable.canSend.value).toBe(false)
    })

    it('空内容 + 组字中 = false', () => {
      composable.setInputText('')
      composable.setComposing(true)
      expect(composable.canSend.value).toBe(false)
    })

    it('startComposition 后 canSend 变 false', () => {
      composable.setInputText('hello')
      expect(composable.canSend.value).toBe(true)
      composable.startComposition()
      expect(composable.canSend.value).toBe(false)
    })

    it('endComposition 后如果有内容 canSend 变 true', () => {
      composable.setInputText('hello')
      composable.startComposition()
      expect(composable.canSend.value).toBe(false)
      composable.endComposition()
      expect(composable.canSend.value).toBe(true)
    })

    it('setInputText 直接修改内容', () => {
      composable.setInputText('测试内容')
      expect(composable.inputText.value).toBe('测试内容')
    })

    it('setComposing 直接修改组字状态', () => {
      composable.setComposing(true)
      expect(composable.isComposing.value).toBe(true)
      composable.setComposing(false)
      expect(composable.isComposing.value).toBe(false)
    })
  })

  describe('clearInput', () => {
    it('清空输入内容', () => {
      composable.setInputText('一些内容')
      expect(composable.inputText.value).toBe('一些内容')
      composable.clearInput()
      expect(composable.inputText.value).toBe('')
      expect(composable.canSend.value).toBe(false)
    })

    it('清空后 canSend 为 false', () => {
      composable.setInputText('test')
      composable.clearInput()
      expect(composable.canSend.value).toBe(false)
    })
  })

  describe('v-model 双向绑定', () => {
    it('inputText 是 ref 可直接赋值', () => {
      composable.inputText.value = '直接赋值'
      expect(composable.inputText.value).toBe('直接赋值')
      expect(composable.canSend.value).toBe(true)
    })
  })
})
