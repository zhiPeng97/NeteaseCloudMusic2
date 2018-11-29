<template>
  <div class='MusicTop'>
    <div class="top">
      <mu-button icon @click="closeTopList">
        <i class="icon-left"></i>
      </mu-button>
      <span>
        排行榜
      </span>
    </div>
    <!-- 加载画面 -->
    <div class="loader" v-if="!officialList.code">
      <mu-circular-progress class="demo-circular-progress" color="#df4238" :size="50"
                            style="display:block;margin:60px auto 0;">
      </mu-circular-progress>
      <p>正在加载</p>
    </div>
    <!-- 榜单分类 -->
    <div class="TopTypes" ref="topTypes" v-show="officialList.code">
      <div>
        <div v-if="officialList.code">
          <div class="title">
            <span>官方榜</span>
          </div>
          <mu-list class="types ">
            <!-- 歌手榜 -->
            <!--<mu-list-item button>-->
              <!--<div class="left">-->
                <!--<img :src="officialList.artistToplist.coverUrl" alt="加载失败！">-->
              <!--</div>-->
              <!--<div class="right">-->
                <!--<div class="top3" v-for="(art, artIndex) in officialList.artistToplist.artists" :key="artIndex">-->
                  <!--{{artIndex}}. {{art.first}}-->
                  <!--<i class="icon-myFavorite hot"></i>-->
                  <!--{{art.third}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</mu-list-item>-->
            <!-- 赞赏榜 -->
            <!--<mu-list-item button>-->
              <!--<div class="left">-->
                <!--<img :src="officialList.rewardToplist.coverUrl" alt="加载失败！">-->
              <!--</div>-->
              <!--<div class="right">-->
                <!--<div class="top3" v-for="(reward, rewardIndex) in officialList.rewardToplist.songs" :key="rewardIndex">-->
                  <!--{{rewardIndex}}. {{reward.name}} - <span v-for="(rewArt, rewArtindex) in reward.artists" :key="rewArtindex">-->
                  <!--{{rewArt.name}}-->
                <!--</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</mu-list-item>-->
            <mu-list-item button @click="showList(val.id)"
v-for="(val, index) in officialList.list" :key="index"
            :class="index>3?'otherClass':index === 3? 'offialLast': ''">
              <div class="left">
                <img :src="val.coverImgUrl" alt="加载失败">
              </div>
              <div v-if="index<4" class="right">
                <div class="top3" v-for="(item, topNum) in val.tracks" :key="topNum">
                  {{topNum}}. {{item.first}} - {{item.second}}
                </div>
              </div>
              <div v-if="index>3" class="button">
                {{val.name}}
              </div>
            </mu-list-item>
          </mu-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {SHOW_TOP_LIST} from '../../../store/mutation-types'
  import BScroll from 'better-scroll'

  export default {
    name: 'MusicTop',
    created() {
      this.getAllTop()
    },
    mounted() {
      this.$nextTick(() => {
          this.typesScroll = new BScroll(this.$refs.topTypes, {
            click: true
          })
      })
    },
    data() {
      return {}
    },
    computed: {
      ...mapState(['officialList'])
    },
    methods: {
      ...mapMutations({
        showTopListFun: SHOW_TOP_LIST
      }),
      ...mapActions(['getAllTop', 'listDetails']),
      showList(id) {
        console.log(id)
        this.listDetails({id: id})
      },
      closeTopList() {
        this.showTopListFun(false)
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .MusicTop
    position: fixed
    left: 0
    width: 100%
    bottom: 0
    background: #fff
    top: 0
    .top
      padding-top: 20px
      box-sizing: border-box
      height: 70px
      line-height: 42px
      background: #df4238
      font-size: 20px
      color: rgba(255, 253, 236, 0.95)
      button
        vertical-align: top
        margin: 0 4px
    .TopTypes
      position: absolute
      top: 70px
      left: 0
      width: 100%
      bottom: 0
      overflow: hidden
      .title
        padding: 14px 0 0 14px
        height: 62px
        font-size: 18px
        font-weight: 600
        font-family: 宋体
        line-height: 48px
      .mu-list
        padding: 0 0 50px 0
        /deep/ .mu-item
          height: 130px
          width: 100%
          padding: 0
          .left
            padding: 10px 0 0 10px
            box-sizing: border-box
            width: 33%
            img
              width: 100%
              border-radius: 4px
          .right
            margin-left: 10px
            padding-top: 10px
            width: 66%
            height: 100%
            box-sizing: border-box
            overflow: hidden
            border-bottom: 1px solid #f3f3f3
            .top3
              width: 100%
              font-size: 14px
              line-height: 36px
              color: #575757
              text-overflow: ellipsis
              white-space: nowrap
              overflow: hidden
              i
                padding: 0 2px 0 14px
              .hot
                color: #999999
        /deep/ .offialLast
          margin-bottom: 40px
        /deep/ .otherClass
          display: inline-block
          position: relative
          margin-top: 14px
          margin-left: 2%
          width: 30.5%
          height: 160px
          text-align: center
          .mu-item
            display: block
            width: 100%
            height: 160px
          .left
            width: 100%
            padding: 0 0 6px 0
            img
              width: 100%
              vertical-align: top
          .right
          .button
            /*padding: 0 4px*/
            display: block
            width: 100%
            height: 34px
            line-height: 17px
            overflow: hidden
    .loader
      font-size: 18px
      text-align: center
</style>
