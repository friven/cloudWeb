<template>
  <div class="chat">
    <div class="addressBook">
      <div class="search">
        <SearchChat></SearchChat>
      </div>
      <div class="address">
        <div class="addressCon" v-for="item in addressList" :key="item.id">
          <div class="itemAddress" :style="{ backgroundColor: userActive == item.id ? 'rgb(200, 198, 198)' : '#eee' }"
            @click="userClick(item.id)">
            <img src="../../assets/image/c.png" alt="">
            <div class="userChat">
              <p>{{ item.nickName }}</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- v-show="userActive != -1" -->
    <div ref="chatContentRef" v-show="userActive != -1" class="chatContent" id='chatContent'>
      <div class="chatTitle">
        <p>{{ findObjForID(userActive)?.nickName }}</p>
      </div>
      <div ref="chatRecodeRef" class="chatRecode">
        <div class="recodeList" v-for="(item, index) in recodeData" :key="index">
          <p class="recodeTime">{{ item.time }}</p>
          <div :class="userID == item.sendID ? 'recodeItemReserve' : 'recodeItem'">
            <!-- <div class="flexDic"> -->
            <img src="../../assets/image/c.png" alt="">
            <div class="itemUserChat">
              <p>{{ userID == item.sendID ? nickName : item.sendNickName }}</p>
              <p>{{ item.content }}</p>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="dividerLine" draggable="true" @dragstart="dragstart($event)" @drag="drag($event)"
        @dragend="dragend($event)"></div>
      <div class="chatInput">
        <!-- <div class="point top" ></div> -->
        <div class="inputTool">
          <span ref="emjoyRef" class="emjoyT iconfont icon-xiaolian" v-click-outside="onClickOutside"></span>
        </div>
        <el-popover width="500" placement="top-start" ref="popoverRef" :virtual-ref="emjoyRef" trigger="click" title=""
          virtual-triggering>
          <div class="emjoyBox">
            <span class="emjoyItem" @click="emjoyClick(item)" v-for="(item, index) in emjoyList" :key="index"
              v-html="parsingEmoji(item)">
            </span>
          </div>
        </el-popover>
        <div class="inputArea">
          <el-input v-model="chatInput" @keydown.ctrl.enter="feedLine($event)" @keydown.enter="sendMessage($event)"
            resize="none" :rows="inputRow" type="textarea" placeholder="Send Message" />
        </div>
        <div class="sendMsgBtn">
          <p>Ctrl+Enter:?????? | Enter:??????</p>
          <el-popover placement="top-end" title="" :visible="emptyFlag" :width="100" trigger="click" content="???????????????????????? !">
            <template #reference>
              <el-button class="m-2" type="primary" @click="sendMessage($event)">??????</el-button>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, unref, onBeforeMount, nextTick, onMounted } from 'vue'
import SearchChat from '@/components/Chat/SearchChat.vue'
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { Store, useStore } from 'vuex'

import {
  emojisAmap,
  emojisBmap
} from '../../utils/emjoydata'
import useScroll from '../../utils/useScroll'
import { send, wsInit } from '../../utils/webSocket'
import parsingEmoji from '../../utils/emjoymethod'
import { getFriendsAPI } from '../../request/api'
import addEvent from '../../utils/utils'
// import { useState, useGetters, useMutations, useActions } from '../../hook/useStore.js'
interface address {
  headPic: string,
  nickName: string,
  id: number
}

interface recodeType {
  receiveID: number,
  time: string,
  sendID: number,
  content: string,
  sendNickName: string,
  receiveNickName: string
}

const emjoyRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const addressList = reactive<address[]>([
  // { headPic: '../../assets/image/c.png', nickName: '??????1', id: 1 },
  // { headPic: '../../assets/image/c.png', nickName: '??????2', id: 2 }
])

const recodeData = reactive<recodeType[]>([
  // { sendID: 10000, receiveID: 10002, time: getDate(), content: '??????1????????????1111111111' },
  // { sendID: 10002, receiveID: 10002, time: getDate(), content: '??????2????????????' },
  // { sendID: 10003, receiveID: 10003, time: getDate(), content: '??????2????????????' },
  // { sendID: 10004, receiveID: 10004, time: getDate(), content: '??????2????????????' },
  // { sendID: 10005, receiveID: 10005, time: getDate(), content: '??????2????????????' },
  // { sendID: 10006, receiveID: 10006, time: getDate(), content: '??????2????????????' },
  // { sendID: 10007, receiveID: 10007, time: getDate(), content: '??????2????????????' },
  // { sendID: 10008, receiveID: 10008, time: getDate(), content: '??????2????????????' }
])

const userActive = ref<number>(-1)
const userClick = (id: number) => {
  userActive.value = id
}
const store: Store<any> = useStore()

const findObjForID = (id: number) => {
  const fineObj = addressList.find((item: address) => {
    return item.id === id
  })
  return fineObj
}
const userID = computed(() => store.state.userID)
const nickName = computed(() => store.state.nickName)
const emjoyList: string[] = []

const chatInput = ref<string>('')
const chatRecodeRef = ref(null)
const chatContentRef = ref(null)
function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  function addZero(data: number) {
    return data < 10 ? '0' + data : data
  }
  const tt = year + '-' + addZero(month) + '-' + addZero(day) + ' ' +
    addZero(hour) + ':' + addZero(minute) + ':' + addZero(second)
  return tt
}
const topHeight = ref<string>('60%')
const botHeight = ref<string>('32%')
const startclientY = ref(0) // ??????????????????????????????
const inputRow = ref<number>(7)
const dragstart = (e: DragEvent) => {
  e.stopPropagation()
  startclientY.value = (e as any).clientY
  console.log('--------------ondrag', startclientY.value, inputRow.value)
  // e.preventDefault()
}
// ????????????????????? ?????????????????? ????????? ????????????????????? ??????????????????
const drag = (e: DragEvent) => {
  e.stopPropagation()
  if ((e as any).clientY <= 0) { // ?????????????????? clientY??????0???why???
    return
  }
  const y = startclientY.value - (e as any).clientY
  const clientHeight = (chatContentRef.value as any).clientHeight
  if (y > 0) {
    topHeight.value = 'calc(60% - ' + y + 'px)' // (clientHeight * 0.6 - y) + 'px'// 'calc(60% -' + y + 'px)'
    botHeight.value = 'calc(32% + ' + y + 'px)'// (clientHeight * 0.32 + y) + 'px'// 'calc(32% +' + y + 'px)'
  } else {
    topHeight.value = 'calc(60% + ' + y + 'px)'// (clientHeight * 0.6 + y) + 'px'// 'calc(60% -' + y + 'px)'
    botHeight.value = 'calc(32% - ' + y + 'px)'// (clientHeight * 0.32 - y) + 'px'// 'calc(32% +' + y + 'px)'
  }
  inputRow.value = Number((parseFloat(botHeight.value) / 22).toFixed(0))
  console.log('--------------drag move', y, y / clientHeight, parseFloat(topHeight.value))
}
const dragend = (e: DragEvent) => {
  // e.preventDefault()
  console.log('--------------drag leave')
  e.stopPropagation()
}

const emptyFlag = ref<boolean>(false)
const feedLine = (e: Event) => {
  e.preventDefault()
  console.log('=============', (e as any).ctrlKey, (e as any).keyCode)
  if ((e as any).ctrlKey && (e as any).keyCode === 13) {
    chatInput.value += '\n'
  }
}

const sendMessage = async (e: Event) => {
  e.preventDefault()
  if ((e as any).ctrlKey) {
    return
  }
  if (chatInput.value.trim() === '') {
    emptyFlag.value = true
    setTimeout(() => {
      emptyFlag.value = false
    }, 2000)
    return
  }
  const curMsg = { sendID: userID.value, receiveID: userActive.value, sendNickName: store.state.nickName, receiveNickName: findObjForID(userActive.value)!.nickName, time: getDate(), content: chatInput.value }
  recodeData.push(curMsg)
  send(JSON.stringify(curMsg))
  await nextTick();
  (chatRecodeRef.value as any).scrollTop = (chatRecodeRef.value as any).scrollHeight
  chatInput.value = ''
}

function gid() {
  const id = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000
  return id
}

async function addRecode(msg: recodeType) {
  recodeData.push(msg)
  await nextTick();
  (chatRecodeRef.value as any).scrollTop = (chatRecodeRef.value as any).scrollHeight
}

const emjoyClick = (item: string) => {
  chatInput.value += item
}

const getFriends = () => {
  getFriendsAPI(localStorage.userID).then((res) => {
    if ((res as any).code === 2002) {
      console.log('---------xxxres', (res as any))
      // eslint-disable-next-line semi-spacing
      for (let i = 0;i < (res as any).info.length;i++) {
        const item = (res as any).info[i]
        const json = {
          headPic: '../../assets/image/c.png',
          nickName: item.nickName,
          id: item.userID
        }
        addressList.push(json)
      }
    } else {
      ElMessage.error('????????????????????????,' + (res as any).info)
    }
  })
}

const dragDom = () => {
  // ?????????????????????div
  const c = document.getElementById('container')!
  const chatContent = document.getElementById('chatContent')
  // chat??????????????????
  document.getElementById('app')!.addEventListener('mousemove', move)
  // ??????????????????
  c.addEventListener('mousedown', down)
  // ??????????????????
  document.getElementById('app')!.addEventListener('mouseup', up)

  // ????????????????????????
  let resizeable = false
  // ??????????????????????????????????????????????????????????????????????????????
  let clientY = 0
  // div????????????????????????
  const minW = 8; const minH = 8
  // ?????????????????????????????????n???s???w???e??????
  let direc = ''

  // ?????????????????????????????????
  function up() {
    resizeable = false
    console.log('clientY:', clientY)
  }

  // ?????????????????????????????????
  function down(e: Event) {
    const d = getDirection(e)
    // ?????????????????????????????????????????????????????????
    if (d !== '') {
      resizeable = true
      direc = d
      clientY = (e as any).clientY
    }
  }

  // ??????????????????
  function move(e: Event) {
    // console.log(e)
    const d = getDirection(e)
    let cursor
    if (d === '') cursor = 'default'
    else cursor = d + '-resize'
    // ????????????????????????
    c.style.cursor = cursor

    // ????????????????????????????????????????????????div??????
    if (resizeable) {
      // ?????????????????????????????????????????????
      if (direc.indexOf('n') !== -1) {
        botHeight.value = Math.max(minH, c.offsetHeight + (clientY - (e as any).clientY)) + 'px'
        // topHeight.value = (chatContent.offsetheight - Math.max(minH, c.offsetHeight + (clientY - e.clientY))) / 100 + '%'
        // c.style.height = Math.max(minH, c.offsetHeight + (clientY - e.clientY)) + 'px'
        clientY = (e as any).clientY
        console.log(chatContent)
      }
    }
  }

  // ??????????????????div?????????
  function getDirection(e: Event) {
    let dir = ''
    if ((e as any).target.className.indexOf('top') >= 0) dir += 'n'
    return dir
  }
}
onMounted(() => {
  nextTick()
  // dragDom()
})

// ?????????????????????????????????????????????
onBeforeMount(() => {
  const objB = emojisBmap
  for (const key in objB) {
    emjoyList.push(key)
  }
  wsInit('userID=' + store.state.userID, (res: string) => {
    console.log('ws on message', res)
    addRecode(JSON.parse(res))
  })
  const jsonID = { content: '..cf..' + userID.value }
  setTimeout(() => {
    send(JSON.stringify(jsonID)) // ??????????????????????????????
  }, 1000)
  getFriends()
})

</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;
  display: flex;

  .addressBook {
    width: 20%;
    height: 100%;
    // background-color: skyblue;
    display: flex;
    flex-direction: column;

    // justify-content:space-between;
    .search {
      width: 100%;
      height: 8%;
      background-color: #fff;
    }

    .address {
      width: 100%;
      height: 92%;
      background-color: #eee;

      .addressCon {
        width: 100%;
        height: 80px;

        cursor: pointer;

        .itemAddress {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 10px;
          display: flex;

          img {
            width: 40px;
            height: 40px;
            align-self: center;
            border-radius: 5px;
          }

          .userChat {
            width: 100%;
            margin-left: 10px;
            align-self: center;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }

  .chatContent {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content:space-between;

    .chatTitle {
      width: 100%;
      height: 60px;
      border-left: 1px solid #eee;
      background-color: #fff;
      align-self: center;
      display: flex;

      p {
        align-self: center;
        margin-left: 10px;
      }

    }

    .chatRecode {
      width: 100%;
      height: v-bind(topHeight);
      background-color: rgb(245, 245, 245);
      box-sizing: border-box;
      padding: 20px;
      overflow-y: auto;

      .recodeList {
        // width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 20px;

        .recodeTime {
          align-self: center;
          font-size: 10px;
          color: #aaa;
        }
      }
    }

    .dividerLine {
      height: 5px;
      border-bottom: 1px solid #ccc;
      background-color: rgb(245, 245, 245);
      cursor: s-resize;
    }

    .chatInput {
      width: 100%;
      height: v-bind(botHeight);

      .inputTool {
        width: 100%;
        height: 35px;
        background-color: rgb(245, 245, 245);
        padding: 5px 5px 5px 5px;
        box-sizing: border-box;

        .emjoyT {
          font-size: 25px;
          font-weight: normal;
          cursor: pointer;
        }

        .emjoyBox {
          display: flex;
          flex-direction: row;

          .emjoyItem {}

          .emjoyItem:hover {
            transform: scale(1.2);
          }
        }
      }

      .inputArea {
        height: 65%;
      }

      .sendMsgBtn {
        height: 60px;
        background-color: #eee;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;

        p {
          margin-right: 20px;
        }
      }
    }
  }

  .recodeItem {
    width: 100%;
    height: auto;
    margin-top: 10px;
    display: flex;
    flex-direction: row;

    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-right: 10px;
    }

    .itemUserChat {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      p:nth-child(1) {
        font-size: 12px;
        color: gray;
        font-weight: normal;
        align-self: flex-start;
      }

      p:nth-child(2) {
        width: auto;
        max-width: 100%;
        align-self: flex-start;
        font-size: 12px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        margin: 0;
        margin-top: 5px;
        word-wrap: break-word;
      }
    }
  }

  .recodeItemReserve {
    width: 100%;
    height: auto;
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;

    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-left: 10px;
    }

    .itemUserChat {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      p:nth-child(1) {
        font-size: 12px;
        color: gray;
        font-weight: normal;
        align-self: flex-end;
      }

      p:nth-child(2) {
        width: auto;
        max-width: 100%;
        align-self: flex-end;
        font-size: 12px;
        background-color: #95ec69;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        margin: 0;
        margin-top: 5px;
        word-wrap: break-word;
      }
    }

  }

}
</style>
