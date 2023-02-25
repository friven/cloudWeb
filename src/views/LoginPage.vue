<template>
  <NavigationBar></NavigationBar>
  <div class="backGroundImage">
    <div class="content">
      <div class="login">
        <div class="loginContent">
          <el-input class="user" v-model="userName" placeholder="用户名/邮箱" />
          <el-input class="pwd" v-model="password" placeholder="密码" />
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
        <el-input class="pwd" v-model="password_Reg" placeholder="密码" />
        <el-input class="pwd" v-model="mail_Reg" placeholder="邮箱" />
        <el-button class="registerBtn" size="large" type="danger">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue' // @ is an alias to /src
import { ref } from 'vue'
import { useStore } from 'vuex'

const userName = ref<string>('')
const password = ref<string>('')
// eslint-disable-next-line camelcase
const userName_Reg = ref<string>('')// eslint-disable-next-line camelcase
const password_Reg = ref<string>('')// eslint-disable-next-line camelcase
const mail_Reg = ref<string>('')
// 登录注册动画start
const loginY = ref<string>('0px')
const tmpX = ref<string>('50%')
const registerX = ref<string>('100%')
const loginFlag = ref<boolean>(true)
const loginTransReg = () => {
  if (loginFlag.value) {
    loginY.value = '100%'
    tmpX.value = '0px'
    registerX.value = '50%'
    loginFlag.value = false
  } else {
    loginY.value = '0px'
    tmpX.value = '50%'
    registerX.value = '100%'
    loginFlag.value = true
  }
}

const loginClick = () => {
  const store = useStore()
  store.commit('setUserName', userName)
  store.commit('setUserID', password)
}
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
