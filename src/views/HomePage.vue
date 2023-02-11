<template>
  <div class="home">
    <NavigationBar></NavigationBar>
    <div class="backGroundImage">
      <div class='bannerWave1'></div>
      <div class='bannerWave2'></div>

    </div>
    <div class="message">
      <p>料青山见我应如是</p>
      <div class="yiyan">{{ paragraphTmp }}<span class="cursor">|</span></div>
    </div>
    <div>
      <div class="wave1"></div>
      <div class="wave2"></div>
    </div>
    <div class="content">

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onBeforeUnmount, reactive, ref } from 'vue'
import { Vue } from 'vue-class-component'
import { testGetApi, yiyanAPI } from '../request/api'
import NavigationBar from '@/components/NavigationBar.vue' // @ is an alias to /src

// components: {
//   NavigationBar
// },
const arr: string[] = ['首页', 'Tab1']
const paragraph = ref<string>('') // 存储一言全部数据
const paragraphTmp = ref<string>('')// 存储定时器定时增加数据
let timer = 0
let timerIndex = 0
// const paraWidth = ref<string>('50px')
// const backGroundImageHome = ref<string>('../assets/image/bc1.jpg')
const number = 0
// const num1: number = number || 111 // 0默认也是undefined
// const num2: number = number ?? 111
// console.log('print num', num1, num2)
// setup虽然自带async，但单独用await只能在顶层使用，如果在函数下还是要async / await一起写
// let res = await indexAPI() //顶层直接使用
// const search = async(val: IUseTableParam) => { //函数中用
//     let res = await returnApplyListAPi({
//         ...val,
//     })
//     let { list, pageNum, pageSize, total } = res.data
// }
// 每日一言接口及调用
const yiyan = () => { // .then 使用回调函数
  yiyanAPI().then((res) => {
    console.log('***', res)
    paragraph.value = res.toString()
    startTimer()
  })
}
yiyan()

const startTimer = () => {
  timer = setInterval(() => {
    // 设置定时器
    paragraphTmp.value += paragraph.value[timerIndex]
    timerIndex++
    if (timerIndex === paragraph.value.length) {
      clearInterval(timer)
      setTimeout(() => {
        timerIndex = 0
        paragraphTmp.value = ''
        startTimer()
      }, 3000)
    }
  }, 300)
}

onBeforeUnmount(() => {
  clearInterval(timer) // 清除定时器
  timer = 0
})
// export default class HomeView extends Vue {
//   const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// }
</script>

<style lang="scss" scoped>
// $imageBG: v-bind('backGroundImageHome');
@keyframes gradientBG{
  0%{
    background-position:0 50%
    }
  50%{
    background-position:100% 50%
    }
    to{
      background-position:0 50%
      }
}

.backGroundImage {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: center / cover no-repeat;
  background-image: url('../assets/image/bc1.jpg');
  .bannerWave1,.bannerWave2{
    position:absolute;
    bottom:0;
    -webkit-animation: gradientBG 120s linear infinite;
    animation: gradientBG 120s linear infinite;
  }
   .bannerWave1{
     height: 84px;
      background: url('../assets/image/bannerWave1') repeat-x;
      width: 200%;
      z-index: 10;
   }
   .bannerWave2{
         height: 100px;
        background:  url('../assets/image/bannerWave2')  repeat-x;
        width: 400%;
        z-index: 5;
   }
}

.message {
  width: 100%;
  height: 120px;
  text-align: center;
  padding: 400px 0 400px 0;
  color: #fff;
  font-size: 50px;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  height: 1000px;
  margin-top: 920px;
  background-color: #fff;
}

.yiyan {
  // width: v-bind('paraWidth');
  height: 50px;
  background-color: rgba($color: #2c2929, $alpha: 0.6);
  border-radius: 10px;
  align-self: center;
  margin-top: 10px;
  cursor: pointer;
  color: #fff;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
}

@keyframes hide {
  to {
    visibility: hidden;
    opacity: 0;
    transform: translateY(100px)
  }
}

.cursor {
  margin-left: 1px;
  animation: hide .7s infinite;
  font-weight: 400;
  font-family: 'Courier New', Courier, monospace;
}
</style>
