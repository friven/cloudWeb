<template>
  <div class="chat">
    <div class="addressBook">
      <div class="search">
        <SearchChat @searchFriend=searchFriend></SearchChat>
      </div>
      <div class="address">
        <div class="addressCon" @click='getNewfriends'>
          <el-image style="width: 35px; height: 35px;border-radius:5px;margin-right:10px;" :src="friendPng"
            fit="fill"></el-image>
          新的朋友<el-badge v-if='applicatNum' class="mark" :value="applicatNum" />
        </div>
      </div>
    </div>
    <div ref="chatContentRef" class="chatContent">
      <div class="chatTitle">
        <h3>{{ chatTitle }}</h3>
      </div>
      <div class='chatContent_info'>
        <div>
          <el-empty v-if='Newfriends.length == 0 && chatTitle' description="暂无数据"></el-empty>
          <ul class='friendsList' v-if='Newfriends.length > 0 && chatTitle'>
            <li class='friends_one' v-for='item in Newfriends' :key="item.userId">
              <el-image style="width: 60px; height: 60px;border-radius:5px;" :src="item.profilePhoto"
                fit="fill"></el-image>
              <div class='applicatInfo'>
                <p>{{ item.nickName }}</p>
                <p style="color:#aaa;">{{ item.verification }}</p>
              </div>
              <!-- v-if='item.isAdd' -->
              <el-button type="success" size="mini">接受</el-button>
              <!-- <span style="color:#aaa;font-size:12px;" v-else>已添加</span> -->
            </li>
          </ul>
        </div>

        <div class='searchInfo' ref='searchInfo' v-if='searchInfoShow'>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFriend, getapplicatNum, searchUser } from '../../request/api'
import SearchChat from '@/components/Chat/SearchChat.vue'
import { ElMessage, MessageParamsWithType } from 'element-plus'
import friend from '../../assets/image/friend.png'
const chatTitle = ref<string>('')
const friendPng = ref<string>(friend)
const applicatNum = ref<number>(0)

interface friendsType {
  nickName: string,
  profilePhoto: string,
  verification: string,
  userId: string,
  isAdd: boolean
}

const Newfriends = ref<friendsType[]>([
  // { nickName: '123', profilePhoto: 'https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500', verification: '你好', userId: '121212', isAdd: false }
])
const searchInfoShow = ref<boolean>(false)
const searchInfo = ref()
const getNewfriends = () => {
  chatTitle.value = '新的朋友'
  const uID = localStorage.getItem('userID')
  if (uID) {
    getFriend(uID).then((res: { data: any }) => {
      // console.log(res)
      if ((res as any).code === 200) {
        const data = res.data
        Newfriends.value = data
        // console.log(res, 'res===============')
      } else {
        ElMessage.error('获取好友申请失败')
      }
    })
  }
}
const getapplicat = () => {
  const uID = localStorage.getItem('userID')
  if (uID) {
    getapplicatNum(uID).then((res: { data: any }) => {
      if ((res as any).code === 200) {
        const data = res.data
        applicatNum.value = data
        // console.log(res, 'res===============')
      }
    })
  }
}

const searchFriend = (val: any) => {
  // console.log('父组件', val)
  // const obj = {
  //   phoneNumber :val
  // }
  searchUser(val).then((res: any) => {
    if ((res as any).code === 200) {
      // const data = res.data
      // applicatNum.value = data
      if (res.data) {
        console.log(res, 'res===============')
        searchInfoShow.value = true
      } else {
        ElMessage.error(res.msg)
      }
    }
  })
}

onMounted(() => {
  getapplicat()
  // 点击  document 关闭搜索的用户信息
  document.addEventListener('click', (e) => {
    if (searchInfo.value) {
      searchInfoShow.value = false
    }
  })
})

</script>

<style lang="scss" scoped>
li {
  list-style: none;
}

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
        height: 60px;
        display: flex;
        box-sizing: border-box;
        padding-left: 10px;
        // justify-content:center;
        align-items: center;
        border-bottom: 1px solid #ccc;
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
      box-sizing: border-box;
      padding-left: 20px;
      border-left: 1px solid #eee;
      background-color: #fff;
      align-self: center;
      display: flex;
      border-bottom: 1px solid #ccc;

      p {
        align-self: center;
        margin-left: 10px;
      }

    }

    .chatContent_info {
      width: 100%;
      height: 92%;
      position: reactive;

      .searchInfo {
        width: 30%;
        height: 20%;
        // background:#ccc;
        position: absolute;
        left: 300px;
        top: 60px;
        box-shadow: 2px 2px 3px #ccc
      }
    }

    .friendsList {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .friends_one {
        width: 70%;
        // margin:0 auto;
        height: 70px;
        // background:#eee;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .applicatInfo {
          width: 75%;
          height: 100%;
          // margin-left:10px;
          box-sizing: border-box;
          padding: 5px 0 10px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
