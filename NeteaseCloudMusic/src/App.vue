<template>
  <div id="app">
    <div class="aaa">
      <div class="cover" v-if="showCover" @click="showCover=false">
        <div class="clock">{{countDown}} 秒</div>
      </div>
      <!-- 登录页面 -->
      <LoginView v-show="loginState"></LoginView>
      <!-- 全网搜索组件 -->
      <Search v-if="showAllSearch"></Search>
      <!-- 顶部组件 -->
      <TopBar></TopBar>
      <!-- 底部播放器组件 -->
      <router-view/>
      <!-- 侧边栏-->
      <SideColumn></SideColumn>
      <!-- 内容页面 -->
      <ContentView></ContentView>
      <!-- 歌单详情 -->
      <transition name="listMove">
        <div v-if="showListDetails">
          <ListDetails></ListDetails>
        </div>
      </transition>
      <!-- 播放组件 -->
      <PlaySong></PlaySong>
    </div>
  </div>
</template>

<script>
  import LoginView from './components/login/LoginView'
  import TopBar from './components/topBar/TopBar'
  import SideColumn from './components/sideColumn/SideColumn'
  import ContentView from './components/content/ContentView'
  import {mapState, mapActions} from 'vuex'
  import ListDetails from './components/list/ListDetails'
  import PlaySong from './components/playSong/PlaySong'
  import Search from './components/search/Search'
  // import {CHANGE_ACTIVE} from './store/mutation-types'

  export default {
    created() {
      this.getVideoDatasFun()
      setTimeout(() => {
        clearInterval(timing)
        this.showCover = false
      }, 3000)
      let timing = setInterval(() => {
        this.countDown--
      }, 1000)
    },
    data() {
      return {
        showCover: true,
        countDown: 3,
        refresh: 10 // 获取 MV的 数量
      }
    },
    computed: {
      ...mapState({
        loginState: 'loginState',
        showListDetails: 'showListDetails',
        showAllSearch: 'showAllSearch'
      })
    },
    methods: {
      ...mapActions(['getNewVideoDatas', 'getMvDatas', 'getMvPlayUrl']),
      getVideoDatasFun() { // 获取 MV 数据
        // this.getNewVideoDatas({MvPage: 0, count: this.refresh})
      }
    },
    components: {
      LoginView,
      TopBar,
      Search,
      SideColumn,
      ContentView,
      ListDetails,
      PlaySong
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  #app
    background: #fff
    .cover
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      background: url("../static/img/cover.jpg")
      background-size: 100%
      z-index: 1000
      .clock
        float: right
        margin: 20px
        padding: 2px 10px
        border-radius: 4px
        text-align: right
        font-size: 20px
        color: #eee
        background: rgba(147, 147, 147, 0.6)
        z-index: 1001
</style>
