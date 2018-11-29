<template>
  <div class="DaysRecom">
    <!-- 头部 -->
    <div class="top" v-if="listDetails.length">
      <div class="go_back">
        <mu-button icon @click="closeRecomomend(false)">
          <i class="icon-left"></i>
        </mu-button>
        <span>
          每日推荐
        </span>
      </div>
    </div>
    <!-- 加载动画 -->
    <div class="loader" v-if="!listDetails.length">
      <mu-circular-progress class="demo-circular-progress" color="#df4238" :size="50"
                            style="display:block;margin:60px auto 0;">
      </mu-circular-progress>
      <p>正在加载</p>
    </div>
    <!-- 播放音乐列表 -->
    <div class="song_list" ref="song_list" v-if="listDetails.length">
      <div>
        <div class="img">
          <div class="box">
            <img :src="listDetails[0].album.picUrl" alt="加载失败">
          </div>
        </div>
        <div class="list_top">
          <div class="top_left" @click="playMusic(0)">
            <i class="icon-play"></i>
            播放全部(共首)
          </div>
        </div>
        <div class="list_content">
          <mu-list textline="two-line">
            <mu-list-item avatar button v-for="(val, index) in listDetails" :key="index"
                          @click="playMusic(index)">
              <mu-list-item-action class="
list_count">
                <img :src="val.album.blurPicUrl" width="44">
              </mu-list-item-action>
              <mu-list-item-title>
                {{val.name}}
              </mu-list-item-title>
              <mu-list-item-sub-title>
                  <span v-for="(artor, num) in val.ar" :key="num">
                    {{artor.name}}
                  </span>
              </mu-list-item-sub-title>
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
  import {SHOW_DAY_RECOMMEND} from '../../../store/mutation-types'
  import BScroll from 'better-scroll'

  export default {
    name: 'DaysRecom',
    created() {
      this.getEveryDayRecommend()
        .then(() => {
          this.$nextTick(() => {
            this.lilstScroll = new BScroll(this.$refs.song_list, {
              click: true
            })
          })
        })
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    computed: {
      ...mapState(['listDetails', 'playingSong'])
    },
    methods: {
      ...mapMutations({
        closeRecomomend: SHOW_DAY_RECOMMEND
      }),
      ...mapActions(['getEveryDayRecommend', 'playDaysMusic', 'getAllMusicDetails']),
      playMusic(index) {
        this.playDaysMusic({index: index})
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .DaysRecom
    position: fixed
    top: 0
    left: 0
    width: 100%
    bottom: 0
    overflow: hidden
    z-index: 1
    background: #fff
    .top
      padding-top: 10px
      height: 58px
      background: #df423b
      line-height: 48px
      color: rgba(255, 255, 255, 0.91)
      span
        font-size: 17px
      button
        vertical-align: top
    .song_list
      background: #fff
      position: absolute
      top: 58px
      bottom: 0
      left: 0
      width: 100%
      padding-bottom: 50px
      overflow: auto
      z-index: 10
      .img
        width: 100%
        height: 160px
        position: relative
        .box
          position: absolute
          left: 0
          bottom: 0
          top: -214px
          width: 100%
          overflow: hidden
          img
            margin-top: 70px
            width: 100%
      .list_top
        background: #fff
        display: flex
        height: 46px
        line-height: 46px
        border-bottom: 1px solid rgba(180, 180, 180, 0.36)
        border-radius: 8px
        font-size: 14px
        z-index: 100
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
            padding: 0 10px 0 20px
            height: 60px
            font-size: 17px
            margin: 0
            border-bottom: 1px solid rgba(207, 207, 207, 0.19)
            .list_count
              width: 30px
            .mu-item-content
              margin-left: -20px
            .mu-item-title
              width: 800px
            i
              font-size: 16px
    .loader
      font-size: 17px
      line-height: 60px
      text-align: center
</style>
