<template>
  <div class="chat">
    <div class="addressBook">
      <div class="search">
        <SearchChat></SearchChat>
      </div>
      <div class="address">
        <div class="addressCon">

        </div>
      </div>
    </div>
    <div ref="chatContentRef" class="chatContent">
      <div class="chatTitle">
        <p></p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { } from 'vue'
import SearchChat from '@/components/Chat/SearchChat.vue'
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
  }
}
</style>
