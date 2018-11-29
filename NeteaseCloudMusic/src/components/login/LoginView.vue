<template>
  <div class="LoginView">
    <div class="layout">
      <div class="loginBox">
        <div class="top">
          <img src="../../public/img/aa9.png" height="84">
        </div>
        <div class="inp">
          <mu-container>
            <mu-text-field v-model="userId" type="number" label="手机账号" prefix="" label-float></mu-text-field>
            <br/>
            <mu-text-field v-model="pwd" label="密 码" label-float
                           :action-icon="visibility ? 'visibility_off' : 'visibility'"
                           :action-click="() => (visibility = !visibility)"
                           :type="visibility ? 'text' : 'password'"></mu-text-field>
            <br/>
          </mu-container>
        </div>
        <div class="affButton" @click="sendLoginData">登录</div>
      </div>
      <div class="visitors_to_login" @click="closeLoginPage(false)">
        <span>游客登录</span>
      </div>
      <div class="moreLink">
        <div class="title">其他登录方式</div>
        <div class="link_box">
          <div class="icon_button">
            <mu-button icon color="primary">
              <img src="../../public/img/aj2.png" width="48">
            </mu-button>
            <p>网易</p>
          </div>
          <div class="icon_button">
            <mu-button icon color="primary">
              <img src="../../public/img/aj5.png" width="48">
            </mu-button>
            <p>QQ</p>
          </div>
          <div class="icon_button">
            <mu-button icon color="primary">
              <img src="../../public/img/aj7.png" width="48">
            </mu-button>
            <p>微博</p>
          </div>
          <div class="icon_button">
            <mu-button icon color="primary">
              <img src="../../public/img/aj9.png" width="48">
            </mu-button>
            <p>微信</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {USER_LOGIN} from '../../store/mutation-types'

  export default {
    name: 'LoginView',
    data() {
      return {
        userId: '',
        pwd: '',
        visibility: false
      }
    },
    computed: {
      ...mapState(['login'])
    },
    methods: {
      ...mapActions({getLogin: 'getLogin'}),
      ...mapMutations({
        closeLoginPage: USER_LOGIN
      }),
      sendLoginData() {
        this.getLogin({id: this.userId, pwd: this.pwd, axios: this.axios})
        this.userId = ''
        this.pwd = ''
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .LoginView
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 9999
    .layout
      position: relative
      height: 100%
      background: url("../../public/img/aij.jpg") no-repeat
      background-size: 100%
      .visitors_to_login
        margin-top: 18px
        margin-left: 60px
        font-size: 15px
        font-weight: 300
        span
          text-decoration: underline
          /*padding: 4px*/
          /*border: 1px solid #ccc*/
          /*border-radius: 12px*/
      .loginBox
        .top
          padding: 80px 0 30px 0
          text-align: center
        .inp
          text-align: center
          margin-bottom: 16px
          /deep/ .mu-input
            margin-bottom: 0
      .affButton
          margin: 0 auto
          padding: 6px 0
          width: 254px
          border: 1px solid #e3001c
          border-radius: 22px
          font-size: 16px
          text-align: center
          color: #e3001c
      .moreLink
        margin-top: 46px
        padding: 0 50px 50px 50px
        box-sizing: border-box
        .title
          text-align: center
          font-size: 14px
          color: #888
        .link_box
          padding-top: 20px
          display: flex
          .icon_button
            text-align: center
            flex: 1
          p
            font-size: 10px
            color: #949494
</style>
