<template>
  <div class="searchChat">
    <el-input class="search" :prefix-icon="Search" v-model="search" placeholder="搜索" />
    <p>+</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const search = ref<string>('')
</script>

<style lang="scss" scoped>
.searchChat {
  width: 100%;
  height: 100%;
  padding: 15px 10px 15px 10px;
  box-sizing: border-box;
  display: flex;

  .search {
    width: 80%;
    height: 25px;
    align-self: center;
  }

  p {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    font-weight: normal;
    border-radius: 5px;
    align-self: center;
    text-align: center;
    border: 2px solid #ddd;
  }
}
</style>
