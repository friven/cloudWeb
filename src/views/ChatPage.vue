<template>
  <NavigationBar></NavigationBar>
  <div class="backGroundImage">
  </div>

  <div class='card'>
    <div class="sideBar">
      <div class="headPic">
        <img src="../assets/image/bc1.jpg" alt="">
      </div>
      <div class="tabBar" v-for="item in tabBarList" :key="item.name">
        <div class="barItem" @click="tabBarClick(item.name)">
          <span class="iconfont" :class="item.icon" :style="{ color: item.color }"></span>
          <span :style="{
            color: (tabActive == item.name ? 'green' : '#000')
          }">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <ChatView></ChatView>
    </div>

  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue' // @ is an alias to /src
import { reactive, ref } from 'vue'
import { send, wsInit } from '../utils/webSocket'
import ChatView from './Chat/CharView.vue'

interface tabBarType {
  icon: string,
  name: string,
  color: string
}
const tabBarList = reactive<tabBarType[]>([
  { icon: 'icon-xinxi', name: '聊天', color: '#efb336' },
  { icon: 'icon-yaoqinghaoyou', name: '好友', color: '#17abe3' },
  { icon: 'icon--qunliaorukou', name: '群聊', color: '#82529d' }
])

const tabActive = ref<string>('聊天')
const tabBarClick = (name: string) => {
  tabActive.value = name
}

// wsInit()
// setTimeout(() => {
//   send('1234554321')
// }, 1000)
</script>

<style lang="scss" scoped>
.backGroundImage {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: center / cover no-repeat url('https://api.dujin.org/bing/1920.php');
  background-position: 0 -20px;
  animation: bgLoading 2s ease 0s 1 normal none;
}

.card {
  width: 1200px;
  height: 750px;
  opacity: .9;
  border-radius: 10px;
  box-shadow: 0 15px 30px 0, 0 10px 10px 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -375px;
  margin-left: -600px;
  border-radius: 10px;
  overflow: hidden;
  max-width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: row;

  .sideBar {
    width: 5%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;

    .headPic {
      align-self: center;
      width: 40px;
      height: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .tabBar {
      align-self: center;
      margin-top: 20px;

      .barItem {
        cursor: pointer;

        span {
          display: block;
          text-align: center;
        }

        span:nth-child(1) {
          font-size: 30px;
        }

        span:nth-child(2) {
          font-size: 12px;
        }
      }

    }
  }

  .content {
    width: 95%;
    height: 100%;
    background-color: skyblue;
  }
}
</style>
