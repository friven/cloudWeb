<template>
  <NavigationBar></NavigationBar>
  <div class="backGroundImage">
    <div class="content">
      <div class="login">
        <div class="loginContent">
          <el-input class="user" v-model="userName" placeholder="手机" />
          <el-input class="pwd" :show-password="true" v-model="password" placeholder="密码" />
          <p class="forgetPWD">忘记密码？</p>
          <el-button class="loginBtn" size="large" type="danger" @click='loginClick()'>登录</el-button>
        </div>
      </div>
      <div class="registerTmp">
        <div class="tmpContent">
          <p>{{ loginFlag ? "没有账号？" : "已有账号？" }}</p>
          <p>{{ loginFlag ? "立即注册吧" : "请登录" }}</p>
          <el-button class="tmpBtn" size="large" type="danger" @click="loginTransReg()">{{ loginFlag ? "注册" : "登录"
          }}</el-button>
        </div>
      </div>
      <div class="register">
        <p>注册</p>
        <el-input class="user" v-model="userName_Reg" placeholder="用户名" />
        <el-input class="pwd" :show-password="true" v-model="password_Reg" placeholder="密码" />
        <el-input class="pwd" v-model="phone_Reg" placeholder="电话号码" />
        <!-- <el-input class="pwd" v-model="mail_Reg" placeholder="邮箱" /> -->
        <el-button class="registerBtn" size="large" type="danger" @click='registerClick()'>注册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue' // @ is an alias to /src
import { ref, watch } from 'vue'
import { Store, useStore } from 'vuex'
import { registerAPI, loginAPI } from '../request/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const userName = ref<string>('')
const password = ref<string>('')
// eslint-disable-next-line camelcase
const userName_Reg = ref<string>('')// eslint-disable-next-line camelcase
const password_Reg = ref<string>('')// eslint-disable-next-line camelcase
const mail_Reg = ref<string>('')
// eslint-disable-next-line camelcase
const phone_Reg = ref<string>('')
// 登录注册动画start
const loginY = ref<string>('0px')
const tmpX = ref<string>('50%')
const registerX = ref<string>('100%')
const loginFlag = ref<boolean>(true)
const loginTransReg = () => {
  if (loginFlag.value) {
    loginFlag.value = false
  } else {
    loginFlag.value = true
  }
}
const store: Store<any> = useStore() // 必须在setup函数体内调用，函数内调用返回undefined，可能是不是this指向还是什么
const loginClick = () => {
  // const json = {
  //   userName: userName.value,
  //   passWord: password.value
  // }
  const json = {
    phoneNumber: userName.value,
    userPassword: password.value
    // email: mail_Reg.value,
    // phoneNumber: phone_Reg.value
  }
  loginAPI(json).then((res) => {
    console.log(res)
    if ((res as any).code === 200) {
      ElMessage({
        message: '登录成功',
        type: 'success'
      })
      router.push({ path: '/' })
      const data = res.data
      // console.log(res, 'res===============')

      // console.log('success', (res as any).info)
      const user = data.username
      const uID = data.id
      const nickName = data.nickName
      const token = data.token
      store.commit('setUserName', user)
      store.commit('setUserID', uID)
      store.commit('setNickName', nickName)
      localStorage.setItem('nickName', nickName)
      localStorage.setItem('userName', user)
      localStorage.setItem('userID', uID)
      localStorage.setItem('x-auth-token', token)
    } else {
      ElMessage.error('登录失败,' + (res as any).msg)
    }
  })
}

const registerClick = () => {
  // store.commit('setUserName', userName.value)
  // store.commit('setUserID', password.value)
  // const json = {
  //   userName: userName_Reg.value,
  //   passWord: password_Reg.value,
  //   email: mail_Reg.value
  // }

  const json = {
    nickName: userName_Reg.value,
    userPassword: password_Reg.value,
    // email: mail_Reg.value,
    phoneNumber: phone_Reg.value
  }
  registerAPI(json).then((res) => {
    if ((res as any).code === 200) {
      ElMessage({
        message: '注册成功！',
        type: 'success'
      })
      loginFlag.value = true
    } else {
      ElMessage.error('注册失败,' + (res as any).msg)
    }
  })
}

watch(
  loginFlag,
  (newval, oldval) => {
    if (!newval) {
      loginY.value = '100%'
      tmpX.value = '0px'
      registerX.value = '50%'
    } else {
      loginY.value = '0px'
      tmpX.value = '50%'
      registerX.value = '100%'
    }
  }
  // {immediate: true}
)
// 登录注册动画end
</script>

<style lang="scss" scoped>
.backGroundImage {
  position: fixed;
  width: 100%;
  height: 100%;
  background: center / cover no-repeat url('https://api.dujin.org/bing/1920.php');

}

.content {
  width: 750px;
  height: 450px;
  opacity: .9;
  border-radius: 10px;
  box-shadow: 0 15px 30px 0, 0 10px 10px 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -225px;
  margin-left: -375px;
  border-radius: 10px;
  overflow: hidden;
  max-width: 100%;
  background-color: #fff;
}

.login {
  position: relative;
  left: 0;
  top: v-bind(loginY);
  width: 50%;
  height: 100%;
  background-color: #fff;
  transition: all 1s ease-in-out;

  .loginContent {
    width: 100%;
    height: 50%;
    position: relative;
    top: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .forgetPWD {
      margin-top: 20px;
      cursor: pointer;
    }

    .loginBtn {
      width: 100px;
      margin-top: 20px;
      border-radius: 100px;
    }

  }
}

.user,
.pwd {
  width: 75%;
  margin-top: 20px;
}

//!!!
:deep(.el-input__wrapper) {
  background-color: #eee !important;
}

//!!!
.register {
  position: absolute;
  left: v-bind(registerX);
  top: 0;
  width: 50%;
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  transition: all 1s ease-in-out;

  p {
    margin-top: 22%;
    font-size: 30px;
  }

  .registerBtn {
    width: 100px;
    margin-top: 20px;
    border-radius: 100px;
  }
}

.registerTmp {
  position: absolute;
  left: v-bind(tmpX);
  top: 0;
  width: 50%;
  background-image: linear-gradient(90deg, #ff4b2b, #ff416c);
  height: 100%;
  transition: all 1s ease-in-out;

  .tmpContent {
    width: 100%;
    height: 50%;
    position: relative;
    top: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    p:nth-child(1) {
      font-size: 30px;
      margin-top: 20px;
    }

    p:nth-child(2) {
      margin-top: 42px;
    }

    .tmpBtn {
      width: 100px;
      margin-top: 42px;
      border-radius: 100px;
    }
  }

}
</style>
