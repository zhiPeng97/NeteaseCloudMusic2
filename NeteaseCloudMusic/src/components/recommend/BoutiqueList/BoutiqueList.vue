<template>
  <div class="BoutiqueList">
    <!-- 加载画面 -->
    <div class="loader" v-if="!boutiqueList.length>0">
      <mu-circular-progress class="demo-circular-progress" color="#df4238" :size="50"
                            style="display:block;margin:60px auto 0;">
      </mu-circular-progress>
      <p>正在加载</p>
    </div>
    <div v-if="firstBoutiqueList.length>0" class="top_bg">
      <img :src="firstBoutiqueList[0].coverImgUrl">
    </div>
    <div v-if="boutiqueList.length>0">
      <div class="top">
        <div class="nav">
          <mu-button icon @click="closeSongsList">
            <i class="icon-left"></i>
          </mu-button>
          <span>歌单</span>
        </div>
        <div class="top_content">
          <div class="left">
            <img :src="firstBoutiqueList[0].coverImgUrl" alt="加载失败">
          </div>
          <div class="right" @click="showSongList(firstBoutiqueList[0].id)">
            <div class="right_title">
              <i class="icon-myFavorite"></i>
              <span>精品歌单</span>
              <mu-button icon>
                <i class="icon-right"></i>
              </mu-button>
            </div>
            <div class="right_desc">
              <p>{{firstBoutiqueList[0].name}}</p>
              <span>{{firstBoutiqueList[0].copywriter}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container" ref="container">
        <div>
          <mu-list>
            <mu-list-item button="" class="title">
              全部歌单
              <mu-button icon>
                <i class="icon-right"></i>
              </mu-button>
            </mu-list-item>
          </mu-list>
          <div class="containerBox">
            <mu-list>
              <mu-list-item button v-for="(item, index) in boutiqueList" :key="index"
              @click="showSongList(item.id)" class="box">
                <div class="box_top">
                  <img :src="item.coverImgUrl" alt="">
                </div>
                <div class="list_name">
                  {{item.name}}
                </div>
              </mu-list-item>
            </mu-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {SHOW_BOUTIQUE_LIST} from '../../../store/mutation-types'
  import BScroll from 'better-scroll'
  export default {
    name: 'BoutiqueList',
    created() {
      this.getBoutiqueList()
    },
    updated() {
      this.$nextTick(() => {
        this.containerScroll = new BScroll(this.$refs.container, {
          click: true
        })
      })
    },
    data() {
      return {
        show: false
      }
    },
    computed: {
      ...mapState(['firstBoutiqueList', 'boutiqueList'])
    },
    methods: {
      ...mapMutations({
        closeBSList: SHOW_BOUTIQUE_LIST
      }),
      ...mapActions(['getBoutiqueList', 'listDetails']),
      closeSongsList() {
        this.closeBSList(false)
      },
      showSongList(id) {
        this.listDetails({id: id})
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .BoutiqueList
    position: fixed
    top: 0
    left: 0
    width: 100%
    bottom: 0
    background: #fff
    .loader
      margin-top: 100px
      line-height: 60px
      font-size: 16px
      color: rgba(0, 0, 0, 0.66)
      text-align: center
    .top_bg
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 200px
      overflow: hidden
      background: rgba(0, 0, 0, 0.85)
      z-index: -1
      img
        width: 100%
        filter: blur(60px)
    .top
      box-sizing: border-box
      height: 200px
      padding-top: 10px
      .nav
        line-height: 50px
        color: rgba(255, 255, 255, 0.9)
        button
          margin-right: 10px
          height: 50px
          vertical-align: top
        span
          font-size: 17px
          line-height: 48px
      .top_content
        margin-top: 10px
        display: flex
        .left
          width: 36%
          img
            margin-left: 14%
            width: 76%
            max-height: 120px
        .right
          width: 64%
          padding-right: 10px
          .right_title
            height: 48px
            line-height: 48px
            font-size: 18px
            font-weight: 600
            .icon-myFavorite
              color: #eeaf5d
              margin-top: 2px
            span
              margin-left: 4px
              color: #fff
            button
              position: relative
              left: -8px
              font-weight: 400
              color: rgba(255, 255, 255, 0.7)
              vertical-align: top
          .right_desc
            p
              font-size: 15px
              text-overflow: ellipsis
              white-space: nowrap
              overflow: hidden
              color: #fff
            span
              margin-top: 4px
              display: block
              font-size: 12px
              line-height: 14px
              color: rgba(255, 255, 255, 0.51)
              text-overflow: ellipsis
              white-space: nowrap
              overflow: hidden

    .container
      position: absolute
      top: 200px
      left: 0
      width: 100%
      bottom: 0
      overflow: hidden
      padding: 0
      .title
        padding: 10px 0
        height: 48px
        line-height: 48px
        font-size: 17px
        font-weight: 500
        button
          vertical-align: top
      .containerBox
        /deep/ .mu-list
          padding: 0
          margin: 0
          width: 100%
          .box
            margin-left: 2%
            position: relative
            display: inline-block
            float: left
            width: 47%
          .mu-item
            display: block
            padding: 0
            margin: 0
            height: 234px
            .box_top
              width: 100%
              img
                width: 100%
                border-radius: 4px
            .list_name
              width: 100%
  a
</style>
