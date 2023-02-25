<template>
  <div class="home">
    <NavigationBar :naviTopY="naviTopY"></NavigationBar>
    <div class="backGroundImage">
    </div>
    <div class="message">
      <p>料青山见我应如是</p>
      <div class="yiyan">{{ paragraphTmp }}<span class="cursor">|</span></div>
    </div>
    <div class="content">
      <div class="waveCon">
        <div class='bannerWave1'></div>
        <div class='bannerWave2'></div>
      </div>
      <div class="blog">
        <div class="verticalContent">
          <div class="leftBox"></div>
          <div class="rightBox">
            <div class="blogBox">
              <!-- <el-skeleton :rows="5" /> -->
              <div class="blogConent" :class="item.index % 2 == 0 ? 'flexRow' : 'flexRowReserve'"
                v-for="item in blogObjTmp" :key="item.index">
                <div class="blogImg">
                  <img :src=item.image :class="item.index % 2 == 0 ? 'imgLeftBr' : 'imgRightBr'" alt="">
                </div>
                <div class="blogText" :class="item.index % 2 == 0 ? 'textAlignRight' : 'textAlignleft'">
                  <p>发布于{{ item.create_time }}</p>
                  <p>{{ item.title }}</p>
                  <p v-html="item.md_content"></p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, computed, reactive, onMounted } from 'vue'
// import { Vue } from 'vue-class-component'
import { yiyanAPI, blogAPI } from '../request/api'
import NavigationBar from '@/components/NavigationBar.vue' // @ is an alias to /src
import useScroll from '../utils/useScroll'
import addEvent from '../utils/utils'
// components: {
//   NavigationBar
// },
const paragraph = ref<string>('') // 存储一言全部数据
const paragraphTmp = ref<string>('')// 存储定时器定时增加数据
let timer = 0
let timerIndex = 0
type blogType = {
  image: string,
  // eslint-disable-next-line camelcase
  md_content: string,
  // eslint-disable-next-line camelcase
  create_time: string,
  author: string,
  title: string,
  index: number
}
const blogObj = reactive<blogType[]>([])
const blogObjTmp = reactive<blogType[]>([])
const blogCount = ref<number>(5)
// 每日一言接口及调用
const yiyan = () => { // .then 使用回调函数
  yiyanAPI().then((res) => {
    // console.log('***', res.data)
    paragraph.value = res.data.toString()
    startTimer()
  })
}

// 博客内容
const blogApi = () => { // .then 使用回调函数
  blogAPI().then((res: any) => {
    console.log('***', res)
    blogObj.push(...res)
    // eslint-disable-next-line array-callback-return
    res.map((item: blogType, index: number) => {
      item.index = index
      if (index < 5) {
        blogObjTmp.push(item)
      }
    })
  })
}

const naviTopY = ref<string>('0')

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

onMounted(() => {
  // declare var window: Window & typeof globalThis; ts中window及全局变量类型声明不是仅window 使用as any
  addEvent('scroll', () => {
    useScroll(window as any).then((res: any) => {
      const scrollTop = res.scrollTop.value
      const isReachBottom = res.isReachBottom.value
      if (scrollTop > 100) {
        naviTopY.value = '-60px'
      } else {
        naviTopY.value = '0'
      }
      if (isReachBottom) {
        // eslint-disable-next-line array-callback-return
        blogObj.map((item: blogType, index: number) => {
          if (index >= blogCount.value && index < blogCount.value + 5 && blogCount.value < blogObj.length) {
            blogObjTmp.push(item)
          }
        })
        blogCount.value += 5
      }
    })
  })
  blogApi()
  yiyan()
})

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

// vite中使用new Url加载本地图片 webpack中require或import 此处引入后报错 待查
// const bgColor = () => {
//   const imgUrl = new URL(`${backGroundImageHome.value}`, import.meta.url).href
//   return imgUrl
// }

// export default class HomeView extends Vue {
//   const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// }
</script>

<style lang="scss" scoped>
@keyframes gradientBG {
  0% {
    background-position: 0 50%
  }

  50% {
    background-position: 100% 50%
  }

  to {
    background-position: 0 50%
  }
}

@keyframes hide {
  to {
    visibility: hidden;
    opacity: 0;
    transform: translateY(100px)
  }
}

@keyframes bgLoading {
  0% {
    opacity: 0;
    transform: translateY(-20%)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

@keyframes contentLoading {
  0% {
    opacity: 0;
    transform: translateY(20%)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

.backGroundImage {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: center / cover no-repeat url('https://api.dujin.org/bing/1920.php');
  background-position: 0 -20px;
  animation: bgLoading 2s ease 0s 1 normal none;
}

.message {
  width: 100%;
  height: 120px;
  text-align: center;
  padding: 300px 0 300px 0;
  color: #fff;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.yiyan {
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

.content {
  width: 100%;
  animation: contentLoading 2s ease 0s 1 normal none;

  .waveCon {
    height: 100px;
    width: 100%;
    background-color: transparent;
    position: relative;
    top: 0;
    z-index: 10;
    overflow: hidden;

    .bannerWave1,
    .bannerWave2 {
      position: absolute;
      -webkit-animation: gradientBG 120s linear infinite;
      animation: gradientBG 120s linear infinite;
    }

    .bannerWave1 {
      height: 84px;
      background: url('../assets/image/bannerWave1') repeat-x;
      width: 200%;
      z-index: 10;
    }

    .bannerWave2 {
      height: 100px;
      background: url('../assets/image/bannerWave2') repeat-x;
      width: 400%;
      z-index: 5;
    }
  }

  .blog {
    width: 100%;
    background-color: #fff;
    margin-top: -16px;
    overflow: hidden;

    .verticalContent {
      width: 90%;
      margin: 0 5% 0 5%;
      display: flex;
      margin-top: 16px;

      .leftBox {
        width: 30%;
        // background-color: orange;
      }

      .rightBox {
        width: 100%;
        margin-left: 20px;

        .blogBox {
          max-width: 780px;
          margin: auto;

          .blogConent:hover {
            cursor: pointer;
            box-shadow: 0 1px 20px 5px;
          }

          .blogConent {
            width: 100%;
            height: 300px;
            display: flex;
            background-color: #fff;
            border-radius: 10px;
            margin-top: 20px;
            box-shadow: 0 1px 20px -6px;
            transition: all .3s ease;

            .blogImg {
              width: 50%;
              border-radius: 10px;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
                display: block;
                transition: all 1s;
              }

              img:hover {
                transform: scale(1.2);
              }
            }

            .blogText {
              width: calc(50% - 20px);
              height: calc(100% - 20px);
              overflow: hidden;
              padding: 10px;
              display: flex;
              flex-direction: column;
              user-select: none;
              line-height: 1.4;

              p:nth-child(1) {
                font-size: 12px;
                width: 100%;
                text-overflow: clip;
                margin-top: 10px;
                color: #797979;
              }

              p:nth-child(2) {
                font-size: 20px;
                width: 100%;
                font-weight: bold;
                text-overflow: clip;
                margin-top: 10px;
              }

              p:nth-child(3) {
                font-size: 15px;
                width: 100%;
                height: 30%;
                text-overflow: clip;
                overflow: hidden;
                margin-top: 10px;
              }
            }
          }
        }
      }
    }
  }
}

.flexRowReserve {
  flex-direction: row-reverse;
}

.flexRow {
  flex-direction: row;
}

.imgLeftBr {
  border-radius: 10px 0 0 10px;
}

.imgRightBr {
  border-radius: 0 10px 10px 0;
}

.textAlignRight {
  text-align: right;
}

.textAlignleft {
  text-align: left;
}

.cursor {
  margin-left: 1px;
  animation: hide .7s infinite;
  font-weight: 400;
  font-family: 'Courier New', Courier, monospace;
}

.footer {
  width: 100%;
  height: 100px;
  background-color: green;
  animation: contentLoading 2s ease 0s 1 normal none; //防止页面加载白屏动画时 显示
}
</style>
