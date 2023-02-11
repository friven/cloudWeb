<template>
  <header class="titleBar">
    <p class="title">生活倒影</p>
    <div class="sideBar">
      <div class="sideItem" v-for="item in NavigationBar" :key="item">
        {{ item }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const NavigationBar: string[] = reactive(['首页', '生活倒影', '聊天室', '留言板', '关于'])
console.log(NavigationBar.length)
console.log(NavigationBar)

</script>

<style lang="scss" scoped>
.titleBar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  font-size: 30px;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.titleBar:hover {
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 3px 0px rgb(0, 34, 77);
}

.sideBar {
  display: flex;
  justify-content: space-around;
  line-height: 60px;
}

.sideItem {
  width: 150px;
  // background-color: skyblue;
  text-align: center;
  color: #fff;
}

.title {
  height: 60px;
  line-height: 60px;
  color: #fff;
  margin-left: 20px;
}

.title:hover {
  color: red;
  cursor: pointer;
}
</style>
