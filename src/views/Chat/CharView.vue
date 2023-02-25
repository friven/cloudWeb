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
    <div class="chatContent">
      <div class="chatTitle">
        <p>{{ findNameForID(userActive)?.nickName }}</p>
      </div>
      <div class="chatRecode">
        <div class="recodeList" v-for="(item, index) in recodeData" :key="index">
          <div class="recodeItemReserve">
            <div class="flexDic">
              <img src="../../assets/image/c.png" alt="">
              <div class="itemUserChat">
                <p>{{ item.nickName }}</p>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chatInput">
        <div class="inputTool"></div>
        <div class="inputArea"></div>
        <div class="sendMsgBtn"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import SearchChat from '@/components/Chat/SearchChat.vue'
import { useStore } from 'vuex'
// import { useState, useGetters, useMutations, useActions } from '../../hook/useStore.js'
interface address {
  headPic: string,
  nickName: string,
  id: number
}

interface recodeType {
  headPic: string,
  nickName: string,
  time: Date,
  id: number,
  content: string
}

const addressList = reactive<address[]>([
  { headPic: '../../assets/image/c.png', nickName: '用户1', id: 1 },
  { headPic: '../../assets/image/c.png', nickName: '用户2', id: 2 }
])

const recodeData = reactive<recodeType[]>([
  { headPic: '../../assets/image/c.png', nickName: '用户1', id: 1, time: new Date(), content: '用户1发的内容1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111' },
  { headPic: '../../assets/image/c.png', nickName: '用户2', id: 2, time: new Date(), content: '用户2发的内容' }
])

const userActive = ref<number>(-1)
const userClick = (id: number) => {
  userActive.value = id
}
const store = useStore()

const findNameForID = (id: number) => {
  const fineObj = addressList.find((item: address) => {
    return item.id === id
  })
  return fineObj
}
const userID = computed(() => store.state.userID)
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;
  display: flex;

  .addressBook {
    width: 20%;
    height: 100%;
    background-color: skyblue;
    display: flex;
    flex-direction: column;

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

    .chatTitle {
      width: 100%;
      height: 8%;
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
      height: 60%;
      background-color: rgb(245, 245, 245);
      box-sizing: border-box;
      padding: 20px;

      .recodeList {
        // width: 100%;
        display: flex;
        flex-direction: column;
      }
    }

    .chatInput {
      width: 100%;
      height: 32%;

      .inputTool {
        width: 100%;
        height: 15%;
        background-color: red;
      }

      .inputArea {
        height: 65%;
      }

      .sendMsgBtn {
        height: 20%;
        background-color: #eee;
      }
    }
  }

  .recodeItem {
    width: 50%;
    height: auto;
    margin-top: 20px;

    .flexDic {
      display: flex;
      flex-direction: row-reverse;

      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        margin-right: 10px;
      }

      p:nth-child(1) {
        font-size: 12px;
        color: gray;
        font-weight: normal;
      }

      p:nth-child(2) {
        font-size: 12px;
        background-color: skyblue;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        margin-top: 5px;
        width: 50%;
        word-wrap: break-word;
      }
    }
  }

  .recodeItemReserve {
    width: 100%;
    height: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;

    .flexDic {
      width: 50%;

      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        margin-left: 10px;
      }

      p:nth-child(1) {
        font-size: 12px;
        color: gray;
        font-weight: normal;
      }

      p:nth-child(2) {
        font-size: 12px;
        background-color: skyblue;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        margin-top: 5px;
        width: 50%;
        word-wrap: break-word;
      }
    }

  }

}
</style>
