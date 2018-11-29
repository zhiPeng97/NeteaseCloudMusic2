<template>
  <div class="VideoView">
    <VideoDetails v-if="ShowVideoDetail" :videoData="videoMsg" @showVideoDetails="showVideoDetails">
    </VideoDetails>
    <div ref="videoCon" class="VideoContainer">
      <div>
        <div v-if="MvDatas.length" class="videoBox" v-for="(item, index) in MvDatas" :key="index">
          <div class="container">
            <div class="cover" @click="showVideo(index)">
              <img :src="item.cover" width="100%" @click="showVideo(index)" ref="cover">
              <video controls v-if="MvDatas[index].brs"
                     :poster="item.cover"
                     preload="none"
                     width="100%"
                     ref="videos"
                     @click="videoPlay()">
                <source :src="MvDatas[index].brs[brs240]?MvDatas[index].brs[brs240]:''"/>
              </video>
            </div>
            <div class="playCount">
              <span>
                <i class="icon-play"></i>
              {{playCount(item.playCount)}}
              </span>
            </div>
            <div class="video_title" @click="showVideoDetails(index)">
              {{item.name}}
            </div>
            <div class="video_msg">
              <div class="artists_pic">
                <img :src="item.cover" width="32" height="32">
              </div>
              <div class="artists_name">
                {{MvDatas[index].artists[0].name}}
              </div>
              <div class="likeCount" @click="LikeFun(index)" ref="linkActive">
                <i class="icon-praise_before" ref="iActive"></i>
                <span>{{MvDatas[index].likeCount}}</span>
              </div>
              <div class="commentCount" @click="showVideoDetails(index)">
                <i class="icon-comment"></i>
                <span>{{MvDatas[index].commentCount}}</span>
              </div>
              <div class="share" @click="openBotttomSheet">
                <i class="icon-share"></i>
                <span>{{MvDatas[index].shareCount}}</span>
              </div>
            </div>
          </div>
          <div class="link">
          </div>
        </div>
        <mu-circular-progress class="demo-circular-progress" :size="36" style="display: block;margin: 10px auto;">
        </mu-circular-progress>
        <div class="shareBox" v-show="showShare">
          <mu-container>
            <mu-bottom-sheet :open.sync="open">
              <mu-list @item-click="closeBottomSheet">
                <mu-sub-header>分享到：</mu-sub-header>
                <mu-list-item button>
                  <mu-list-item-action>
                    <mu-icon value="grade" color="orange"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>我的收藏</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                  <mu-list-item-action>
                    <mu-icon value="inbox" color="blue"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>本地保存</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                  <mu-list-item-action>
                    <mu-icon value="chat" color="green"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>微信</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button>
                  <mu-list-item-action>
                    <mu-icon value="email" color="cyan"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>邮箱</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-bottom-sheet>
          </mu-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShareView from '../share/ShareView'
  import VideoDetails from './VideoDetails'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {USER_LOGIN} from '../../store/mutation-types'
  import BScroll from 'better-scroll'

  export default {
    name: 'VideoView',
    created() {
      this.getNewVideoDatas({count: 10, MvPage: this.MvPage})
    },
    mounted() {
      // this.videoConBScroll = new BScroll(this.$refs.videoCon, {
      //   click: true
      // })
      this.loadData()
    },
    data() {
      return {
        videoMsg: '',
        ShowVideoDetail: false,
        open: false,
        brs240: '240',
        refresh: 10,
        mvSrc: '',
        ShowVideo: [],
        addLike: true,
        addComment: true,
        showShare: true,
        addShare: true,
        MvPage: 0
      }
    },
    computed: {
      ...mapState(['userData', 'NewVideoDatas', 'MvDatas', 'MvPlayUrl', 'Login'])
    },
    methods: {
      ...mapMutations({PlaceLogin: USER_LOGIN}),
      ...mapActions(['getNewVideoDatas']),
      getVideoDatasFun() {
        this.getNewVideoDatas({axios: this.axios, count: this.refresh})
          .then(
            this.videoConBScroll.refresh()
          )
      },
      showVideoDetails(i) { // 显示 video 详情
        if (i !== undefined) {
          this.videoMsg = this.MvDatas[i]
        }
        this.ShowVideoDetail = !this.ShowVideoDetail
      },
      LoginFun() {
        this.PlaceLogin(!this.loginState)
      },
      LikeFun(index) {
        if (this.Login) {
          this.addLike ? this.MvDatas[index].likeCount++ : this.MvDatas[index].likeCount--
          this.addLike ? this.$refs.linkActive[index].style.color = '#f00' : this.$refs.linkActive[index].style.color = '#000'
          this.addLike ? this.$refs.iActive[index].className = 'icon-praise_after' : this.$refs.iActive[index].className = 'icon-praise_before'
          this.addLike = !this.addLike
        } else {
          this.LoginFun()
        }
      },
      CommentFun(index) {
        if (this.Login) {
          this.addLike ? this.MvDatas[index].commentCount++ : this.MvDatas[index].commentCount--
          this.addLike = !this.addLike
        } else {
          this.LoginFun()
        }
      },
      ShareFun(index) {
        if (this.showShare) {
          this.addLike ? this.MvDatas[index].likeCount++ : this.MvDatas[index].likeCount--
          this.addLike = !this.addLike
        } else {
          this.LoginFun()
        }
      },
      videoPlay() {
      },
      showVideo(i) {
        for (var j = 0; j < this.MvDatas.length; j++) {
          if (j === i) {
            this.$refs.videos[i].play()
            this.$refs.cover[i].style.display = 'none'
            this.$refs.videos[i].style.display = 'block'
          } else {
            this.$refs.videos[j].pause()
          }
        }
      },
      playCount(num) {
        return num > 10000 ? Math.floor(num / 10000) + '万次' : num + '次'
      },
      closeBottomSheet() {
        this.open = false
      },
      openBotttomSheet() {
        this.open = true
      },
      loadData() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.videoCon, {
              click: true,
              pullUpLoad: {
                threshold: 90, // 负值是当上拉到超过低部 70px；正值是距离底部距离 时
                stop: -50
              }
            })
            this.scroll.on('pullingUp', () => {
              this.MvPage = this.MvPage + 10
              setTimeout(() => {
                this.getNewVideoDatas({count: 10, MvPage: this.MvPage})
                this.scroll.finishPullUp()
              }, 800)
              this.scroll.refresh()
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    components: {
      ShareView,
      VideoDetails
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .VideoView
    width: 100%
    .VideoContainer
      position: absolute
      top: 77px
      bottom: 0
      width: 100%
      overflow: hidden
      .videoBox
        .container
          padding: 10px
          padding-bottom: 0
          .cover
            /*height: 200px*/
            overflow: hidden
            img
              border-radius: 4px
            video
              display: none
              border-radius: 4px
          .playCount
            span
              display: block
              margin: -30px 10px 6px
              font-size: 16px
              color: #dbd9d9
              z-index: 100
          .video_title
            padding: 12px 0
            font-size: 16px
            font-weight: 600
            line-height: 28px
            /*white-space: pre-wrap*/
            text-align: left
            overflow: hidden
            border-bottom: 1px solid rgba(233, 233, 233, 0.61)
          .video_msg
            display: flex
            height: 50px
            line-height: 50px
            i
              line-height: 50px
              font-size: 20px
            span
              vertical-align: top
              font-size: 12px
              color: #949590
            .artists_pic
              img
                flex: 0
                margin-top: 9px
                line-height: 50px
                border-radius: 50%
                margin-right: 8px
            .artists_name
              flex: 1
              font-size: 14px
              font-weight: 500
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden
              span
                font-size: 14px
                color: #000
            .likeCount
              flex: 0
              min-width: 70px
            .commentCount
              flex: 0
              min-width: 70px
            .share
              flex: 0
              min-width: 70px
        .link
          background: #f3f3f3
          height: 8px
      .shareBox
        height: 0
</style>
