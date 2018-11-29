<template>
  <div class="NewSong">
    <div>
      <div class="top">
        <div class="top_bg"></div>
        <div class="nav">
          <mu-button icon @click="closeListDetails(false)">
            <i class="icon-left"></i>
          </mu-button>
          <div class="songList">
            <p>歌单</p>
            <span>{{listDetails.description}}</span>
          </div>
          <mu-button class="search" icon>
            <i class="icon-search"></i>
          </mu-button>
          <mu-button class="more" icon>
            <i class="icon-more-if"></i>
          </mu-button>
        </div>
        <div class="top_content">
          <div class="left">
            <img :src="listDetails.coverImgUrl?listDetails.coverImgUrl:''" width="114"/>
            <span>
              <i class="icon-music"></i>
              {{listDetails.playCount>10000?Math.floor(listDetails.playCount / 10000):listDetails.playCount}}万</span>
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
      <div class="song_list">
        <div class="list_top">
          <div class="top_left">
            <i class="icon-play"></i>
            播放全部(共首)
          </div>
          <div class="top_right">
            + 收藏 ({{listDetails.subscribedCount>10000?Math.floor(listDetails.subscribedCount /
            10000):listDetails.subscribedCount}}万)
          </div>
        </div>
        <!-- 播放音乐列表 -->
        <div class="list_content">
          <mu-list textline="two-line">
            <mu-list-item avatar button v-for="(val, index) in listDetails.tracks" :key="index" @click="playMusic(val)">
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
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {SHOW_LIST_DETAILS} from '../../store/mutation-types'

  let src = require('../../public/img/zw.jpg')
  export default {
    name: 'NewSong',
    data() {
      return {
        imgSrc: src
      }
    },
    computed: {
      ...mapState(['listDetails'])
    },
    methods: {
      ...mapMutations({
        closeListDetails: SHOW_LIST_DETAILS
      }),
      ...mapActions({
        getMusicDetails: 'getMusicDetails'
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
      playMusic(val) {
        // console.log('a', val)
        this.getMusicDetails({axios: this.axios, id: val.id})
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .NewSong
    position: fixed
    top: 0
    left: 0
    width: 100%
    bottom: 0
    background: white
    z-index: 200
    .top
      box-sizing: border-box
      background: rgba(81, 78, 70, 0.91)
      .top_bg
      .nav
        display: flex
        padding: 12px 0
        height: 64px
        line-height: 40px
        color: #e7e8e7
        /deep/ .mu-button
          padding: 0
        .songList
          flex: 1
          p
            font-weight: 500
            font-family: 微软雅黑
            font-size: 17px
            color: #fefefe
            line-height: 24px
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
            color: rgba(217, 218, 217, 0.72)
        /deep/ .mu-button
          flex: 0 48px
          padding: 0
          width: 50px
          font-size: 20px
          border-radius: 0
        /deep/ .mu-button
          flex: 0 48px
          padding: 0
          width: 40px
          font-size: 20px
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
            top: 0
            font-size: 10px
            color: rgba(255, 255, 253, 0.37)
            right: 4px
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
            /deep/ .mu-item
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
          /deep/ li
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
                font-size: 18px
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
          i
            margin-right: 4px
        .top_right
          flex: 0 0 120px
          padding-left: 10px
          color: rgba(255, 255, 255, 0.93)
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
            /deep/ .list_count
              width: 30px
            /deep/ .mu-item-content
              margin-left: -20px
            i
              font-size: 16px
    .tacl
</style>
