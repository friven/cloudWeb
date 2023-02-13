<template>
  <header class="titleBar">
    <p class="title">生活倒影</p>
    <div class="sideBar">
      <div class="sideItem" v-for="item in NavigationBar" :key="item">
        {{ item }}
      </div>
      <div class="login">
        <el-dropdown>
          <img class="headPic" src="../assets/image/bc1.jpg" alt="">
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in LoginList" :key="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const NavigationBar: string[] = reactive([
  '首页',
  '生活倒影',
  '聊天室',
  '留言板',
  '关于'
])
console.log(NavigationBar.length)
console.log(NavigationBar)
const LoginList: string[] = reactive([
  '登录'
])
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
  top: 0;
  left: 0;
  z-index: 1;
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
  width: 100px;
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
</style>
