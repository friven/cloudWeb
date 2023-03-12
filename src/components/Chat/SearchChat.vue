<template>
  <div class="searchChat">
    <el-input class="search" :prefix-icon="Search" @keyup.enter='searchFriend(search)' v-model="search" :placeholder="placeholder" />
    <p @click='addFriend' v-if='placeholder=="搜索"' >+</p>
    <span style='cursor: pointer;font-size:12px;' v-else @click='cancel'>取消</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const search = ref<string>('')
const placeholder = ref<string>('搜索')

// eslint-disable-next-line no-undef
const emit = defineEmits({})
const addFriend = () => {
  search.value = ''
  placeholder.value = '手机号'
}

const cancel = () => {
  search.value = ''
  placeholder.value = '搜索'
}

const searchFriend = (val) => {
  if (val && placeholder.value === '手机号') {
    emit('searchFriend', val)
  }
}

</script>

<style lang="scss" scoped>
.searchChat {
  width: 100%;
  height: 100%;
  padding: 15px 10px 15px 10px;
  box-sizing: border-box;
  display: flex;
  align-items:center;

  .search {
    width: 80%;
    height: 25px;
    align-self: center;
    margin-right:10px;
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
    cursor: pointer;
  }
}
</style>
