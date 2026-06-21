import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

const FAKE_USERS = [
  { id: 'me', name: '我', avatar: '👤' },
  { id: 'alice', name: 'Alice', avatar: '👩' },
  { id: 'bob', name: 'Bob', avatar: '👨' },
  { id: 'charlie', name: 'Charlie', avatar: '🧑' }
]

const now = Date.now()
const min = 60 * 1000

function makeMessage(id, channelId, senderId, content, offsetMinutes) {
  const sender = FAKE_USERS.find(u => u.id === senderId)
  return {
    id,
    channelId,
    content,
    senderId,
    senderName: sender.name,
    senderAvatar: sender.avatar,
    timestamp: now - offsetMinutes * min
  }
}

const INITIAL_MESSAGES = {
  general: [
    makeMessage('g1', 'general', 'alice', '大家好啊，欢迎来到综合讨论群！', 60),
    makeMessage('g2', 'general', 'bob', '今天天气不错，适合出去走走', 55),
    makeMessage('g3', 'general', 'charlie', '确实，周末有什么计划吗？', 50),
    makeMessage('g4', 'general', 'alice', '我准备去爬山 🏔️', 45),
    makeMessage('g5', 'general', 'bob', '听起来很不错，带上我！', 40)
  ],
  tech: [
    makeMessage('t1', 'tech', 'charlie', '有人用过 Vue 3 的 <script setup> 吗？', 90),
    makeMessage('t2', 'tech', 'alice', '用过，体验非常好，代码简洁很多', 85),
    makeMessage('t3', 'tech', 'bob', '配合 Pinia 用起来很香', 80),
    makeMessage('t4', 'tech', 'charlie', '好的，我也准备迁移过来了', 75)
  ],
  random: []
}

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref(FAKE_USERS[0])
  const allUsers = ref(FAKE_USERS)
  const currentChannel = ref('general')
  const isSwitchingChannel = ref(false)
  const channels = ref([
    { id: 'general', name: '综合讨论', unread: 0 },
    { id: 'tech', name: '技术交流', unread: 0 },
    { id: 'random', name: '随便聊聊', unread: 0 }
  ])
  const messagesByChannel = reactive({ ...INITIAL_MESSAGES })

  function getMessages(channelId) {
    return messagesByChannel[channelId] || []
  }

  function addMessage(channelId, message) {
    if (!messagesByChannel[channelId]) {
      messagesByChannel[channelId] = []
    }
    messagesByChannel[channelId].push(message)
  }

  function switchChannel(channelId) {
    if (channelId === currentChannel.value) return
    isSwitchingChannel.value = true
    currentChannel.value = channelId
    setTimeout(() => {
      isSwitchingChannel.value = false
    }, 80)
  }

  return {
    currentUser,
    allUsers,
    currentChannel,
    isSwitchingChannel,
    channels,
    messagesByChannel,
    getMessages,
    addMessage,
    switchChannel
  }
})
