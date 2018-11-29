<template>
  <div class="myMusic" ref="myMusic">
    <div>
      <div class="classify">
        <mu-list>
          <mu-list-item button>
            <span class="icon-mymusic"></span>
            <mu-list-item-title class="itemTitle">本地音乐
              <i>(0)</i>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <span class="icon-myplay"></span>
            <mu-list-item-title class="itemTitle">最近播放
              <i>({{playHistory.length>0?playHistory.length:0}})</i>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <span class="icon-download"></span>
            <mu-list-item-title class="itemTitle">下载管理
              <i>(0)</i>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <span class="icon-broadcasting"></span>
            <mu-list-item-title class="itemTitle">我的电台
              <i>({{userCollect.djRadioCount?userCollect.djRadioCount:0}})</i>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <span class="icon-friend"></span>
            <mu-list-item-title class="itemTitle">我的收藏
              <i>
                ({{userCollect.artistCount?userCollect.artistCount:0}})
              </i>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <span class="icon-night_mode"></span>
            <mu-list-item-title class="lastItemTitle">Stai 空间
              <i>(特别的聆听模式)</i>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </div>
      <div class="createdPlaylist">
        <div class="title" @click="showCreateFun">
          <div class="titleLeft">
            <i :class="showCreateList?'icon-down':'icon-right'"></i>
            我的歌单
            <span v-if="userCollect.length">({{userCollect.createdPlaylistCount}})</span>
          </div>
          <span class="icon-setting"></span>
        </div>
          <div class="contentList">
            <transition name="move">
            <div class="createdContend" v-show="showCreateList">
              <div class="list1Move">
                <mu-list textline="two-line">
                  <mu-list-item button :ripple="true" v-for="(item, index) in userPlayList" :key="index" @click="Details(item.id)">
                    <div class="avatarImg">
                      <img :src="item.coverImgUrl" height="50px">
                    </div>
                    <mu-list-item-content>
                      <mu-list-item-title>{{item.name}}</mu-list-item-title>
                      <mu-list-item-sub-title class="songCount">{{item.trackCount}}首</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <i class="icon-more-if"></i>
                    <div class="line"></div>
                  </mu-list-item>
                </mu-list>
              </div>
            </div>
            </transition>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {SHOW_LIST_DETAILS} from '../../store/mutation-types'
  import BScroll from 'better-scroll'
  export default {
    name: 'MyMusic',
    mounted() {
      this.$nextTick(() => {
        this.playlistScroll = new BScroll(this.$refs.myMusic, {
          click: true
        })
      })
    },
    data() {
      return {
        showCreateList: true
      }
    },
    computed: {
      ...mapState({
        userCollect: 'userCollect',
        playHistory: 'playHistory',
        userPlayList: 'userPlayList'
      })
    },
    methods: {
      ...mapMutations({
        showdetails: SHOW_LIST_DETAILS
      }),
      ...mapActions(['listDetails']),
      Details(id) {
        this.listDetails({axios: this.axios, id})
          .then()
      },
      showCreateFun() {
        this.showCreateList = !this.showCreateList
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .myMusic
    position: fixed
    top: 77px
    width: 100%
    bottom: 0
    overflow: hidden
    .classify
      /deep/ .mu-list
        padding: 2px 0 0 0
      span
        display: inline-block
        width: 44px
        font-size: 24px
        text-align: left
        font-weight: 300
        color: #cf2d23
      .itemTitle
        padding: 10px 0
        height: 46px
        border-bottom: 1px solid rgba(229, 231, 235, 0.85)
      i
        font-size: 13px
        vertical-align: top
        color: #999999
    .createdPlaylist
      .title
        display: flex
        height: 28px
        line-height: 28px
        background: #f3f3f3
        color: #6f6f6f
        .titleLeft
          flex: 1
        &>span
          margin-right: 16px
          font-size: 17px
          line-height: 28px
        i
          padding-left: 12px
      .contentList
        overflow: hidden
        .createdContend
          padding-right: 4px
          overflow: hidden
          transition: all .3s linear
          &.move-enter, &.move-leave-to
            transform: translateY(-100%)
          /deep/ .mu-list
            padding-top: 0
          /deep/ .mu-item
            padding-left: 5px
            max-height: 60px
            position: relative
            i
              margin-left: 10px
            .songCount
              font-size: 12px
            .line
              position: absolute
              left: 58px
              bottom: 2px
              height: 1px
              width: 100%
              background: #f3f3f3
            .avatarImg
              margin-right: 8px
              img
                border-radius: 3px
</style>
