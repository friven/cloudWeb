import { ElMessage } from 'element-plus'

let socket: WebSocket
export function send(message: string) {
  if (!window.WebSocket) {
    return
  }
  console.log('socket.readyState', socket.readyState)
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message)
  } else {
    ElMessage.error('连接没有开启')
  }
}

export function wsInit(param: string, callback: any) {
  if (window.WebSocket) {
    socket = new WebSocket('ws://localhost:3000/ws?' + param)
    socket.onmessage = function (event) {
      console.log('onmessage', event.data)
      callback(event.data)
    }
    socket.onopen = function (event) {
      ElMessage({
        message: '连接开启',
        type: 'success'
      })
    }

    socket.onclose = function (event) {
      ElMessage({
        message: '连接关闭',
        type: 'success'
      })
    }
  } else {
    ElMessage.error('你的浏览器不支持WebSocket')
  }
}
