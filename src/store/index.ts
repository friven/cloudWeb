import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate' //包下载不下来。。。。

interface States {
  userName: string;
  userID: string;
  nickName: string
}

export default createStore<States>({
  state: {
    userName: localStorage.userName ? localStorage.userName : '',
    userID: localStorage.userID ? localStorage.userID : '',
    nickName: localStorage.nickName ? localStorage.nickName : ''
  },
  getters: {
  },
  mutations: {
    setUserName(state: States, userName: string) {
      state.userName = userName
    },
    setUserID(state: States, userID: string) {
      state.userID = userID
    },
    setNickName(state: States, nickName: string) {
      state.nickName = nickName
    }
  },
  actions: {
  },
  modules: {
  }
  // plugins: [createPersistedState({
  //   storage: sessionStorage,
  //   key: 'token'
  // })]// 会自动保存创建的状态。刷新还在
})
