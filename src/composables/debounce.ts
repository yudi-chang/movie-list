import { ref } from 'vue'

// Define the type for the callback function that will be passed to useDebounce
type Callback<T> = (arg?: T) => void

export function useDebounce<T>(callback: Callback<T>, delay = 200) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  const isWaiting = ref<boolean>(false)

  const debounce = (arg?: T): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      callback(arg)
      isWaiting.value = false
    }, delay)
    isWaiting.value = true
  }

  return { debounce, isWaiting }
}
