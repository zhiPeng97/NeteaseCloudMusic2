<template>
  <div>
    <div class="VideoDetails">
      <div class="video" ref="videoBox">
        <div class="videoCover"
             @click="playVideo">
        </div>
        <transition name="top_move">
          <div ref="top" class="top">
            <div class="go_back" @click="$emit('showVideoDetails')">
              <mu-button class="go_back" icon color="primary">
                <i class="icon-left"></i>
              </mu-button>
            </div>
            <div class="name button">
              {{videoDatas.name}}
            </div>
            <div class="share button">
              <mu-button icon color="primary">
                <i class="icon-share"></i>
              </mu-button>
            </div>
            <div class="more-if button">
              <mu-button icon color="primary">
                <i class="icon-more-if"></i>
              </mu-button>
            </div>
          </div>
        </transition>
        <transition name="play_move">
          <div ref="playState" class="playStateFun" @click="playStateFun">
            <i :class="playState?'icon-stop':'icon-play'"></i>
          </div>
        </transition>
        <div class="videoBox">
          <video :poster="videoDatas.cover"
                 preload="none"
                 width="100%" ref="video">
            <source :src="videoQuality[240]">
          </video>
        </div>
      </div>
      <div class="box" ref="box">
        <div>
          <div class="info" ref="info">
            <div class="title" @click="showDescFun">
              <span>{{videoDatas.name}}</span>
              <i :class="showDesc?'icon-down':'icon-right'"></i>
            </div>
            <div class="time">发布：{{videoDatas.publishTime}}<b></b>播放：{{videoDatas.playCount}}
            </div>
            <div class="desc" v-show="showDesc">
              <div>{{videoDatas.briefDesc}}</div>
              <div>{{videoDatas.desc}}</div>
            </div>
            <div class="tag">
              <span>MV</span>
              <span v-for="(val, index) in videoDatas.artists" :key="index">
            {{val.name}}
          </span>
            </div>
            <mu-list class="count">
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>
                    <i class="icon-praise_before"></i>
                  </mu-list-item-title>
                  <mu-list-item-sub-title>
                    {{videoDatas.likeCount}}
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>
                    <i class="icon-myFavorite"></i>
                  </mu-list-item-title>
                  <mu-list-item-sub-title>
                    {{videoDatas.subCount}}
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>
                    <i class="icon-comment"></i>
                  </mu-list-item-title>
                  <mu-list-item-sub-title>
                    {{videoDatas.commentCount}}
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>
                    <i class="icon-share"></i>
                  </mu-list-item-title>
                  <mu-list-item-sub-title>
                    {{videoDatas.shareCount}}
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
            </mu-list>
            <div class="art">
              <img :src="videoDatas.cover" width="30" height="30" alt="">
              <span class="artistName">
            {{videoDatas.artistName}}
          </span>
              <span class="focus">
            <b><i>+</i>关注</b>
          </span>
            </div>
          </div>
          <div class="related">
            <div class="data_title">
              相关推荐
            </div>
            <mu-list>
              <mu-list-item button class="relatedList" v-for="(item, index) in RelatedMvDatas" :key="index"
                            @click="changeMv(item.id)">
                <div class="left">
                  <img :src="item.cover" width="136" height="78" alt="">
                  <span class="count">
                  <i class="icon-play"></i>
                  {{playCountFun(item.playCount)}}
                </span>
                </div>
                <div class="right">
                  <div class="name">
                    <span>MV</span>
                    {{item.name}}
                  </div>
                  <div class="source">{{item.artistName}}</div>
                </div>
              </mu-list-item>
            </mu-list>
          </div>
          <div class="comment">
            <div v-for="(val, index) in commentData" :key="index" :class="index">
              <div class="data_title" v-show="val.length>0">
                {{index ===
                'hotComments'?'热门评论':'评论'}}
              </div>
              <div class="comment_list">
                <div class="comment_item" v-for="(item, num) in val" :key="num">
                  <div class="left">
                    <!--<img src="" alt="">-->
                    <img :src="item.user.avatarUrl?item.user.avatarUrl:''" width="30px" alt="加载失败">
                  </div>
                  <div class="right">
                    <div class="top">
                      <div class="left">
                        <div class="name">{{item.user.nickname}}</div>
                        <div class="date">
                          {{item.time}}
                        </div>
                      </div>
                      <div class="right">
                        <span>
                          {{item.likedCount}}
                          <!--<i :class="likeState?'icon-praise_after':'icon-praise_before'"></i>-->
                          <i class="icon-praise_before"></i>
                        </span>
                      </div>
                    </div>
                    <div class="comment_val">
                      {{item.content}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    props: ['videoData'],
    name: 'VideoDetails',
    created() {
      // this.getRelatedMvDatas({id: this.videoData.id})
      this.getData()
      this.BScrollFun()
    },
    mounted() {
      this.BScrollFun()
    },
    updated() {
      this.BScrollFun()
    },
    data() {
      return {
        commentData: {
          'hotComments': [],
          'comments': []
        },
        // likeState: false, // 点赞
        commentDatas: [],
        theOnce: true,
        playState: false,
        showControl: true,
        topX: 210,
        br: '240',
        showDesc: false,
        videoQuality: this.videoData.brs,
        RelatedMvDatas: [],
        videoDatas: this.videoData
      }
    },
    watch: {
      commentData(newCom, oldCom) {
        return newCom
      },
      RelatedMvDatas(newRelated, oldRelated) {
        return newRelated
      }
    },
    computed: {
      // ...mapState(['RelatedMvDatas'])
    },
    methods: {
      ...mapActions(['getMvDatas', 'getRelatedMvDatas']),
      playVideo() {
        this.BScrollFun()
        this.DetailsScroll.refresh()
        if (this.theOnce) {
          this.playStateFun()
          this.$refs.video.play()
          this.theOnce = false
        }
        // if (this.playState) {
        this.ControlStyle()
        this.showControl = !this.showControl
        // }
      },
      playStateFun() {
        if (!this.playState) {
          this.$refs.video.play()
          this.showControl = false
        } else {
          this.showControl = true
          this.$refs.video.pause()
        }
        this.ControlStyle()
        this.playState = !this.playState
      },
      ControlStyle() {
        if (this.showControl) {
          this.$refs.top.style['transform'] = 'translateY(0)'
          this.$refs.top.style.opacity = 1
          this.$refs.playState.style.opacity = 0.8
        } else {
          setTimeout(() => {
            this.$refs.top.style['transform'] = 'translateY(-100%)'
            this.$refs.top.style.opacity = 0
            this.$refs.playState.style.opacity = 0
            // this.$refs.playState.style.display = 'none'
          }, 3000)
        }
        // this.$refs.top.style['transform'] = `translateY(${val})`
      },
      showDescFun() {
        this.showDesc = !this.showDesc
      },
      playCountFun(num) {
        return num > 10000 ? Math.floor(num / 10000) + '万' : num
      },
      changeMv(id) {
        this.axios.get('/api/mv/detail?mvid=' + id)
          .then((res) => {
            let data = res.data.data
            setTimeout(() => {
              this.videoDatas = data
            }, 100)
            this.getData()
          })
      },
      getData() {
        /* 获取相关MV */
        this.axios.get('/api/simi/mv?mvid=' + this.videoDatas.id)
          .then((res) => {
            this.RelatedMvDatas = res.data.mvs
          })
        /* 获取评论 */
        this.axios.get('/api/comment/mv?id=' + this.videoDatas.id)
          .then((res) => {
            this.commentDatas = res.data
            this.commentData.hotComments = res.data.hotComments
            this.commentData.comments = res.data.comments
          })
      },
      BScrollFun() {
        this.$nextTick(() => {
          this.topX = this.$refs.videoBox.offsetHeight
          this.$refs.box.style.top = this.topX + 'px'
          this.DetailsScroll = new BScroll(this.$refs.box, {
            click: true
          })
        })
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .VideoDetails
    position: fixed
    left: 0
    top: 0
    bottom: 0
    width: 100%
    background: #fff
    z-index: 300
    .video
      width: 100%
      position: relative
      .videoCover
        position: absolute
        top: 0
        bottom: 0
        left: 0
        width: 100%
        z-index: 999
      .top
        padding-top: 10px
        display: flex
        position: absolute
        top: 2px
        left: 0
        right: 0
        width: 100%
        box-sizing: border-box
        line-height: 40px
        color: #fff
        transition: all 0.5s linear
        z-index: 999
        /deep/ button
          flex: 0 0 40px
          height: 40px
          width: 40px
          z-index: 1000
        .more-if
          margin-right: 10px
          z-index: 1000
        .name
          flex: 1 0
          padding: 0 2px
          margin-top: -2px
          font-size: 17px
          height: 40px
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
          z-index: 1000
      .playStateFun
        position: absolute
        left: 50%
        top: 50%
        margin: -30px 0 0 -30px
        font-size: 40px
        color: rgba(255, 255, 255, 0.67)
        z-index: 1000
        transition: all 0.5s linear
    .box
      position: absolute
      top: 210px
      left: 0
      width: 100%
      bottom: 0
      overflow: hidden
    .info
      .title
        padding: 16px 20px
        width: 100%
        font-size: 17px
        line-height: 16px
        font-weight: 600
        display: flex
        span
          flex: 1
          margin-right: 20px
          text-overflow: ellipsis
          white-space: nowrap
          overflow: hidden
      .time
        padding: 0 14px
        height: 20px
        font-size: 12px
        line-height: 20px
        color: #969696
        b
          margin: 0 20px
          height: 20px
          border-right: 2px solid #e5e5e5
      .desc
        padding: 4px 14px 0
        line-height: 24px
        font-size: 12px
        color: #686868
      .tag
        margin-top: 14px
        padding: 0 14px
        height: 22px
        font-size: 10px
        span
          line-height: 10px
          padding: 4px 10px
          margin-right: 10px
          border: 1px solid #e5e5e5
          border-radius: 12px
      .count
        padding: 10px 0
        display: flex
        border-bottom: 1px solid #e6e6e6
      /deep/ .mu-list
        li
          flex: 1
        .mu-item
          height: 50px
          .mu-item-title
            text-align: center
            font-size: 21px
            color: #474747
          .mu-item-sub-title
            text-align: center
            color: #7b7b7b
            font-size: 11px
            line-height: 11px
      .art
        display: flex
        line-height: 54px
        padding: 0 14px
        span
          flex: 1
        img
          margin-top: 12px
          border-radius: 50%
          margin-right: 12px
        .artistName
        .focus
          text-align: right
          b
            font-weight: 300
            width: 50px
            height: 24px
            padding: 5px 10px
            font-size: 12px
            line-height: 12px
            color: #fff
            background: #f65245
            border-radius: 20px
            i
              font-size: 18px
    .data_title
      margin-bottom: 2px
      padding: 0 14px
      height: 26px
      line-height: 26px
      color: #696969
      background: #f3f3f3
    .related
      overflow: hidden
      .relatedList
        height: 86px
      /deep/ .mu-list
        padding: 0
        .mu-item
          padding: 0 12px
          height: 90px
          .left
            position: relative
            img
              margin-top: 5px
              border-radius: 4px
            .count
              position: absolute
              top: 6px
              right: 6px
              color: #fff
              font-size: 10px
          .right
            padding-left: 10px
            .name
              font-size: 13px
              font-weight: 500
              font-family: 微软雅黑
              span
                margin-right: 2px
                padding: 0 4px
                font-size: 10px
                color: #f2574a
                border: 1px solid #f2574a
                border-radius: 2px
            .source
              margin-top: 4px
              font-size: 10px
              font-weight: 300
    .comment
      margin-top: 10px
      .comment_list
        /*padding: 10px 0*/
        .comment_item
          display: flex
          padding: 12px
          padding-bottom: 0
          .left
            flex: 0 0 50px
            /*padding: 10px*/
            img
              border-radius: 50%
          .right
            flex: 1
            padding-bottom: 11px
            border-bottom: 1px solid #f4f4f4
            &:nth-last-child
              border-bottom: none
            .top
              display: flex
              .left
                flex: 1
                .name
                  font-size: 14px
                  line-height: 14px
                  color: #535353
                .date
                  font-size: 11px
                  line-height: 22px
                  color: #8c908f
              .right
                flex: 0 0 100px
                text-align: right
                color: #979797
                font-size: 12px
                line-height: 20px
                border-bottom: none
                span
                  line-height: 21px
                  i
                    font-size: 18px
            .comment_val
              font-size: 15px
              color: #252525

    a
</style>
