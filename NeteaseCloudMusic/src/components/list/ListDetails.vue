<template>
  <div class="ListDetails" ref="ListDetails">
    <div class="ListBox">
      <ListMsg v-show="ShowListMsg" @showListMsg="showListMsg"></ListMsg>
      <ListSearch v-if="showListSearch"></ListSearch>
      <div class="nav">
        <mu-button icon @click="closeListDetails(false)">
          <i class="icon-left"></i>
        </mu-button>
        <div class="songList">
          <p ref="ListSong">歌单</p>
          <span>{{listDetails.description}}</span>
        </div>
        <mu-button class="search" icon @click="ShowListSearch(true)">
          <i class="icon-search"></i>
        </mu-button>
        <mu-button class="more" icon>
          <i class="icon-more-if"></i>
        </mu-button>
      </div>
      <div class="content" ref="content">
        <div>
          <div class="bg">
            <div class="img">
              <img :src="listDetails.coverImgUrl" width="100%" height="260">
            </div>
          </div>
          <!---->
          <!-- 播放音乐列表 -->
          <div class="top">
            <div class="top_box">
              <div class="top_content">
                <div class="left">
                  <img :src="listDetails.coverImgUrl?listDetails.coverImgUrl:''" width="120" @click="showListMsg()"/>
                  <span style="color: rgba(255,255,255,0.92)">
              <i class="icon-music"></i>
              {{listDetails.playCount>10000?Math.floor(listDetails.playCount / 10000):listDetails.playCount}}万</span>
                  <mu-button icon @click="showListMsg">
                    <i class="icon-more-if"></i>
                  </mu-button>
                </div>
                <div class="right">
                  <div class="name">
                    {{listDetails.name}}
                  </div>
                  <mu-list>
                    <mu-list-item button>
                      <img :src="listDetails.creator.avatarUrl?listDetails.creator.avatarUrl: imgSrc" width="24">
                      <span class="nickname">
                <b>{{listDetails.creator.nickname}}</b>
                <i class="icon-right"></i>
              </span>
                    </mu-list-item>
                  </mu-list>
                </div>
              </div>
              <div class="top_count">
                <mu-list>
                  <mu-list-item button>
                    <mu-list-item-content>
                      <mu-list-item-title>
                        <i class="icon-comment"></i>
                      </mu-list-item-title>
                      <mu-list-item-sub-title>
                        {{listDetails.commentCount}}
                      </mu-list-item-sub-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item button>
                    <mu-list-item-content>
                      <mu-list-item-title>
                        <i class="icon-share"></i>
                      </mu-list-item-title>
                      <mu-list-item-sub-title>
                        {{listDetails.shareCount}}
                      </mu-list-item-sub-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item button>
                    <mu-list-item-content>
                      <mu-list-item-title>
                        <i class="icon-download"></i>
                      </mu-list-item-title>
                      <mu-list-item-sub-title>
                        下载
                      </mu-list-item-sub-title>
                    </mu-list-item-content>
                  </mu-list-item>
                  <mu-list-item button>
                    <mu-list-item-content>
                      <mu-list-item-title>
                        <i class="icon-comment"></i>
                      </mu-list-item-title>
                      <mu-list-item-sub-title>
                        多选
                      </mu-list-item-sub-title>
                    </mu-list-item-content>
                  </mu-list-item>
                </mu-list>
              </div>
            </div>
          </div>
          <div class="song_list">
            <div class="list_top">
              <div class="top_left" @click="playMusic(0)">
                <i class="icon-play"></i>
                播放全部(共首)
              </div>
              <div class="top_right">
                + 收藏 ({{listDetails.subscribedCount>10000?Math.floor(listDetails.subscribedCount /
                10000):listDetails.subscribedCount}}万)
              </div>
            </div>
            <div class="list_content">
              <mu-list textline="two-line">
                <mu-list-item avatar button v-for="(val, index) in listDetails.tracks" :key="index"
            @click="playMusic(index)">
                  <mu-list-item-action class="
list_count">
                    {{index+1}}
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>
                      {{val.name}}
                    </mu-list-item-title>
                    <mu-list-item-sub-title>
                  <span v-for="(artor, num) in val.ar" :key="num">
                    {{artor.name}}
                  </span>
                    </mu-list-item-sub-title>
                  </mu-list-item-content>
                  <mu-list-item-action>
                    <mu-button icon>
                      <i class="icon-more-if"></i>
                    </mu-button>
                  </mu-list-item-action>
                </mu-list-item>
              </mu-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ListMsg from './ListMsg'
  import ListSearch from './ListSearch'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {SHOW_LIST_DETAILS, CHANGE_PLAYING, SHOWPLAYVIEW, NEXT_SONG, SHOW_LIST_SEARCH, CLEAR_LIST} from '../../store/mutation-types'

  let src = require('../../public/img/zw.jpg')
  export default {
    name: 'ListDetails',
    mounted() {
      this.$nextTick(() => {
        if (this.listDetails.description) {
          this.$refs.ListSong.style.lineHeight = 24 + 'px'
        }
      })
    },
    data() {
      return {
        ShowListMsg: false,
        imgSrc: src
      }
    },
    computed: {
      ...mapState(['listDetails', 'playingSong', 'showListSearch'])
    },
    methods: {
      ...mapMutations({
        closeListDetails: SHOW_LIST_DETAILS, // 显示列表详情
        changePlayingSong: CHANGE_PLAYING, // 更改当前播放音乐序号
        showPlayView: SHOWPLAYVIEW, // 显示播放页面
        PlayAllMusic: NEXT_SONG, // 换曲
        ShowListSearch: SHOW_LIST_SEARCH, // 显示歌单内搜索页面
        clearList: CLEAR_LIST // 清空播放列表
      }),
      ...mapActions({
        getMusicDetails: 'getMusicDetails',
        getAllMusicDetails: 'getAllMusicDetails'
      }),
      list() {
        return this.listDetails.length > 0 ? this.listDetails : ''
      },
      subCount(count) { // 计算收藏数量
        if (count) {
          return count > 10000 ? Math.floor(count / 10000) : count
        }
        return 0
      },
      playMusic(index) {
        this.getMusicDetails({index: index})
      },
      playAll() {
        this.clearList()
        this.PlayAllMusic(this.playingSong)
        // this.PlayAllMusic(this.)
        for (let i = 0; i < this.listDetails.trackIds.length; i++) {
          this.getAllMusicDetails({id: this.listDetails.trackIds[i].id})
        }
      },
      showListMsg() {
        this.ShowListMsg = !this.ShowListMsg
        if (this.ShowListMsg) {
          this.$refs.ListDetails.style['z-index'] = 300
        } else {
          this.$refs.ListDetails.style['z-index'] = 200
        }
      }
    },
    components: {
      ListMsg,
      ListSearch
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .ListDetails
    position: absolute
    top: 0
    left: 0
    min-height: 100%
    width: 100%
    background: white
    /*z-index: 200*/
    .ListBox
      position: relative
      overflow: inherit
      .nav
        position: fixed
        top: 0
        width: 100%
        display: flex
        padding: 12px 0
        height: 64px
        line-height: 40px
        color: #fff
        background: rgba(0, 0, 0, 0.5)
        z-index: 100
        .mu-button
          padding: 0
        .songList
          flex: 1
          color: rgb(255, 255, 255)
          p
            font-weight: 500
            font-family: 微软雅黑
            font-size: 17px
            color: rgb(255, 255, 255)
            /*line-height: 24px*/
          span
            display: inline-block
            width: 220px
            line-height: 22px
            vertical-align: top
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            font-weight: 300
            font-size: 10px
            color: rgba(254, 255, 254, 0.79)
        .mu-button
          flex: 0 48px
          padding: 0
          width: 40px
          font-size: 20px
          border-radius: 0
      .content
        margin: 64px 0 50px 0
        .bg
          position: absolute
          top: -64px
          left: 0
          width: 100%
          height: 278px
          overflow: hidden
          /*background: rgba(0, 0, 0, 0.25)*/
          z-index: 1
          img
            filter: blur(30px)
        .top
          background: rgba(0, 0, 0, 0.5)
          box-sizing: border-box
          position: relative
          height: 216px
          z-index: 200
          .top_box
            position: absolute
            top: 0
            left: 0
            width: 100%
            .top_content
              display: flex
              padding: 20px 24px 8px
              .left
                flex: 0 0 120px
                margin-right: 8px
                position: relative
                width: 114px
                height: 120px
                img
                  border-radius: 1px
                span
                  position: absolute
                  top: 2px
                  font-size: 10px
                  color: rgba(255, 255, 253, 0.37)
                  right: 6px
                button
                  position: absolute
                  right: 0
                  bottom: 0
                  width: 20px
                  height: 20px
                  font-size: 10px
                  text-align: center
                  color: #fff
              .right
                padding: 4px 0
                .name
                  font-weight: 500
                  color: #fff
                  max-height: 42px
                  max-width: 200px
                  white-space: inherit
                  text-overflow: ellipsis
                  overflow: hidden
                  font-size: 14px
                /deep/ .mu-list
                  padding: 0
                  margin-top: 16px
                  .mu-item
                    padding: 0
                    height: 24px
                    color: rgba(242, 242, 242, 0.73)
                    font-size: 13px
                    font-weight: 300
                    span
                  img
                    vertical-align: top
                    margin-right: 5px
                    border-radius: 50%
            .top_count
              padding-bottom: 6px
              /deep/ .mu-list
                display: flex
                padding: 0 10px
                margin: 0 auto
                li
                  flex: 1
                  padding: 10px 0
                  height: 62px
                  .mu-item-content
                    text-align: center
                    color: #fff
                    .mu-item-sub-title
                      display: inline-block
                      vertical-align: top
                      font-size: 10px
                      font-weight: 300
                      line-height: 20px
                      height: 18px
                      color: rgba(255, 255, 255, 0.64)
                    .mu-item-title
                      vertical-align: bottom
                      text-align: center
                      font-size: 20px
                      font-weight: 300

        .song_list
          .list_top
            background: #fff
            display: flex
            height: 46px
            line-height: 46px
            border-bottom: 1px solid rgba(180, 180, 180, 0.36)
            border-radius: 8px
            font-size: 14px
            .top_left
              flex: 1
              padding-left: 18px
              span
              i
                margin-right: 4px
            .top_right
              flex: 0 0 120px
              padding-left: 10px
              color: rgb(255, 255, 255)
              background: rgb(250, 85, 71)
          .list_content
            ul
              padding: 0
              line-height: 40px
              /deep/ .mu-item
                padding: 0 20px
                height: 60px
                font-size: 17px
                margin: 0
                border-bottom: 1px solid rgba(207, 207, 207, 0.19)
                .list_count
                  width: 30px
                .mu-item-content
                  margin-left: -20px
                i
                  font-size: 16px
</style>
