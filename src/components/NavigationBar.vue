<template>
  <header class="titleBar">
    <p class="title">The Life</p>
    <div class="sideBar">
      <div class="sideItem" v-for="item in NavigationBar" :key="item.index" @click="barClick(item.index)">
        <i class="iconfont" :class="iconList[item.index - 1].name" :style="{ color: iconList[item.index - 1].color }"></i>
        {{
          item.item
        }}
      </div>
      <div class="login">
        <el-dropdown @command="handleCommand">
          <img class="headPic" src="../assets/image/bc1.jpg" alt="">
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in LoginList" :key="item" command="login">
                <i class="iconfont icon-tuichudenglu"></i> {{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, withDefaults, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import useScroll from '../utils/useScroll'
import addEvent from '../utils/utils'
import { navigationType, iconType } from '../utils/interface'
import { ElMessage } from 'element-plus'
const NavigationBar = ref<navigationType[] | null>([
  // 选择商品
  { item: '首页', index: 1, type: 'login' },
  { item: '生活倒影', index: 2, type: 'xx' },
  { item: '聊天室', index: 3, type: 'Chat' },
  { item: '留言板', index: 4, type: 'xx' },
  { item: '关于', index: 5, type: 'about' }
])

const iconList = ref<iconType[]>([
  // 选择商品
  { name: 'icon-shouye', color: 'red' },
  { name: 'icon-pinzhishenghuo', color: 'yellow' },
  { name: 'icon-message', color: 'blue' },
  { name: 'icon-liuyanban-05', color: 'green' },
  { name: 'icon-guanyuwomen', color: '#17abe3' }
])
const router = useRouter()
const handleCommand = (command: string | number | object) => {
  if (command === 'login') {
    router.push({ path: '/login' })
  }
}

const barClick = (index: number) => {
  if (index === 1) {
    router.push({ path: '/' })
  } else if (index === 3) {
    const token = localStorage.getItem('x-auth-token')
    if (token) {
      router.push({ path: '/Chat' })
    } else {
      ElMessage.warning('请先登录')
      // router.push({ path: '/login' })
    }
  }
}
// const NavigationBar: string[] = reactive([
//   '首页',
//   '生活倒影',
//   '聊天室',
//   '留言板',
//   '关于'
// ])
const LoginList: string[] = reactive([
  '登录'
])
interface Props {
  naviTopY: string;
}
// props已经算是响应式数据，并且可以直接用的变量
const props = withDefaults(defineProps<Props>(), {
  naviTopY: '0px'
})
onMounted(() => {
  // declare var window: Window & typeof globalThis; ts中window及全局变量类型声明不是仅window 使用as any
  // addEvent('scroll', () => {
  //   useScroll(window as any).then((res: any) => {
  //     const scrollTop = res.scrollTop.value

  //   })
  // })
})
// const loginImg = ref<string>('../assets/image/bc1.jpg')
</script>

<style lang="scss" scoped>
.titleBar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  font-size: 25px;
  background-color: transparent;
  position: fixed;
  top: v-bind(naviTopY);
  left: 0;
  z-index: 1;
  transition: all .3s ease-in-out;
}

.titleBar:hover {
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 3px 0px rgb(0, 34, 77);
  transition: all .3s ease-in-out;
}

.sideBar {
  display: flex;
  justify-content: space-around;
  line-height: 60px;

}

.sideItem {
  width: 150px;
  text-align: center;
  color: #fff;
  z-index: 100;
  cursor: pointer;
  box-sizing: border-box;

}

.sideItem:hover {
  -webkit-transition: all 0.5s ease-in-out;
  color: orange;
  box-shadow: 0 1px 3px 0 rgb(0 34 77 / 5%);
  transition: all .3s ease-in-out;
  border-bottom: 5px solid orange;
}

.title {
  height: 60px;
  line-height: 60px;
  color: #fff;
  margin-left: 20px;
}

.title:hover {
  color: orange;
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.login {
  width: 100px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .headPic {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
