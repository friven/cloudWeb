import { onMounted, onUnmounted, ref, computed } from 'vue'
let timer: any = null
type EventHanlder = (event?: Event) => any;
// eslint-disable-next-line @typescript-eslint/ban-types
const throttle = function (fn: Function, delay = 300): any {
  // eslint-disable-next-line space-before-function-paren
  if (timer == null) {
    timer = setTimeout(async () => {
      await fn()

      clearTimeout(timer)
      timer = null
    }, delay)
  }
}

// eslint-disable-next-line space-before-function-paren
export default function useScroll(elRef: any): any {
  const el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = function (): any {
    throttle(() => {
      if (el === window) {
        clientHeight.value = document.documentElement.clientHeight
        scrollHeight.value = document.documentElement.scrollHeight
        scrollTop.value = document.documentElement.scrollTop
      }
      if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
        // homeStore.fetchHouselistData()
        isReachBottom.value = true
      }
    }, 100)
  }

  scrollListenerHandler()
  const data = { isReachBottom, clientHeight, scrollTop, scrollHeight }
  return data
}
