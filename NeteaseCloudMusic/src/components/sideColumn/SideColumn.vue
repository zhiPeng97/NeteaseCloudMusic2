<template>
  <div>
    <mu-drawer class="test" :open="open" @close="closeSide(false)" :docked="false">
      <!--{{userData}}-->
      <div class="header">
        <img :src="userData.adValid?userData.profile.backgroundUrl:'./static/img/axr.7d37500.png'" alt="" width="256" height="160">
        <div class="header_bg"></div>
        <div class="loginActive" v-show="userData.adValid">
          <div class="title">
            <div class="userImg">
              <mu-avatar :size="70">
                <img :src="userData.adValid ? userData.profile.avatarUrl:''">
              </mu-avatar>
            </div>
            <div class="username" v-if="userData.adValid ? userData.profile.nickname:''">
              {{userData.profile.nickname}}
            </div>
            <div class="desc">
              <div class="userLv">
                <span>Lv {{userData.level}}</span>
              </div>
              <div class="sign_in">签到</div>
            </div>
          </div>
          <div class="phone">
          </div>
          <div class="explain">
          </div>
        </div>
        <div class="loginOut" v-if="!userData.adValid">
          <p>登录网易云音乐</p>
          <p>手机电脑多端同步，尽情海量高品质音乐</p>
          <div class="placeLogin" @click="LoginFun(true)">
            立即登录
          </div>
        </div>
      </div>
      <div class="list" ref="list">
        <mu-list class="setlist">
          <mu-list-item button class="listIten">
            <i class="icon-mail"></i>
            <mu-list-item-title class="itemTitle">我的信息</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-member"></i>
            <mu-list-item-title class="itemTitle">会员中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-shopping"></i>
            <mu-list-item-title class="itemTitle">商城</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-skin"></i>
            <mu-list-item-title class="itemTitle">个性装扮</mu-list-item-title>
          </mu-list-item>
          <div class="splic"></div>
          <mu-list-item button class="listIten">
            <i class="icon-mail"></i>
            <mu-list-item-title class="itemTitle">我的好友</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-location"></i>
            <mu-list-item-title class="itemTitle">附近的人</mu-list-item-title>
          </mu-list-item>
          <div class="splic"></div>
          <mu-list-item button class="listIten">
            <i class="icon-timing"></i>
            <mu-list-item-title class="itemTitle">定时停止播放</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-mymusic"></i>
            <mu-list-item-title class="itemTitle">免流量特权</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-music"></i>
            <mu-list-item-title class="itemTitle">听歌识曲</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-flicking"></i>
            <mu-list-item-title class="itemTitle">扫一扫</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-timing"></i>
            <mu-list-item-title class="itemTitle">音乐闹钟</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="listIten">
            <i class="icon-cloud"></i>
            <mu-list-item-title class="itemTitle">音乐云盘</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </div>
      <div class="footer">
        <div class="btn">
          <b class="icon-night_mode"></b>
          <span class="mode">夜间模式</span>
        </div>
        <div class="btn">
          <b class="icon-setting"></b>
          <span class="setting">设置</span>
        </div>
        <div class="btn" @click="login_out">
          <b class="icon-login_out"></b>
          <span class="login_out">退出</span>
        </div>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {TOGGLE_COLUMN, USER_LOGIN} from '../../store/mutation-types'
  import src from '../../public/img/axr.png'
  export default {
    mounted() {
      this.$nextTick(() => {
        this.listScroll = new BScroll(this.$refs.list, {
          click: true
        })
      })
    },
    data() {
      return {
        bg: src
      }
    },
    computed: mapState({
      userData: 'userData',
      open: 'showSide'
    }),
    methods: {
      ...mapMutations({
        closeSide: TOGGLE_COLUMN,
        userLogin: USER_LOGIN
      }),
      ...mapActions(['loginOut']),
      LoginFun(val) {
        this.userLogin(val)
        this.closeSide(!val)
      },
      login_out() {
        this.loginOut({axios: this.axios})
        console.log('loginout')
      }
    }
  }
</script>

<style scoped>
  .splic {
    height: 6px;
    background: #f2f6f5;
  }

  .header {
    padding: 50px 10px 10px;
    box-sizing: border-box;
    height: 160px;
    overflow: hidden;
    position: relative;
    color: #fbfbef;
  }

  .header > img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .header .header_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.27);
    z-index: -1;
  }
  .header .loginOut {
    margin-top: -4px;
    text-align: center;
  }
  .header .loginOut>p{
    font-size: 12px;
    line-height: 20px;
    color: #d2d6d9;
    font-weight: 300;
  }
  .header .loginOut .placeLogin{
    box-sizing: border-box;
    margin: 10px auto 0;
    padding: 4px 38px;
    width: 148px;
    border: 1px solid rgba(204, 204, 204, 0.49);
    border-radius: 30px;
  }
  .header .title {
  }

  .header .title .userImg {
  }

  .header .title .username {
    float: left;
    margin-top: 4px;
    font-size: 15px;
    line-height: 22px;
    max-width: 140px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .header .title .desc {
    display: flex;
    margin-top: 4px;
    line-height: 22px;
  }

  .title .desc .userLv {
    flex: 1;
    margin-top: 1px;
    margin-left: 4px;
    font-size: 10px;
  }

  .desc .userLv > span {
    padding: 0 5px;
    border: 1px solid #fbfbef;
    border-radius: 8px;
  }

  .title .desc .sign_in {
    flex: 0 0 40px;
    min-width: 40px;
  }

  .title .name {
    font-size: 20px;
    font-weight: bold;
  }

  .title .email {
    font-size: 12px;
    font-weight: 700;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header .phone {
    font-size: 10px;
    font-weight: bold;
  }

  .header .explain {
    width: 100%;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list {
    position: absolute;
    top: 160px;
    left: 0;
    width: 100%;
    bottom: 46px;
    overflow: hidden;
  }

  .list >>> .setlist {
    padding: 0;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .setlist > i {
    color: #828685;
  }

  .setlist .mu-item-title {
    margin-left: 10px;
  }

  .setlist >>> .mu-item {
    max-height: 38px;
    color: #383c3b;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #e2e2e2;
  }

  .footer .btn {
    display: inline-block;
    margin: 0 10px;
    text-align: center;
    line-height: 20px;
  }

  .btn b {
    font-size: 18px;;
    margin-right: 2px;
  }

  .btn > span {
    margin-top: -2px;
    font-size: 14px;
    vertical-align: top;
  }
</style>
