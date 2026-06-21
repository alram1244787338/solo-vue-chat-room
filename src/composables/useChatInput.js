import { ref, computed } from 'vue'

export function useChatInput() {
  const inputText = ref('')
  const isComposing = ref(false)

  const canSend = computed(() => {
    return inputText.value.trim().length > 0 && !isComposing.value
  })

  function setInputText(value) {
    inputText.value = value
  }

  function setComposing(value) {
    isComposing.value = value
  }

  function startComposition() {
    isComposing.value = true
  }

  function endComposition() {
    isComposing.value = false
  }

  function clearInput() {
    inputText.value = ''
  }

  return {
    inputText,
    isComposing,
    canSend,
    setInputText,
    setComposing,
    startComposition,
    endComposition,
    clearInput
  }
}
