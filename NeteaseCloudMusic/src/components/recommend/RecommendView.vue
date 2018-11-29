<template>
  <div>
    <div class="RecommendView" ref="RecommendView">
      <div>
        <div class="red_bg"></div>
        <div class="banner">
          <mu-carousel hide-controls>
            <mu-carousel-item v-for="(val, index) in BannerData" :key="index">
              <div>
                <img :src="val.imageUrl">
              </div>
            </mu-carousel-item>
          </mu-carousel>
        </div>
        <div class="classButton">
          <div class="button" v-for="(item, index) in buttonIcon" :key="index"
               @click="showView(index)">
            <mu-button fab color="#e14238">
              <i :class="item.icon" class="buttonIcon"></i>
            </mu-button>
            <p>{{item.text}}</p>
          </div>
        </div>
        <div class="list_container">
          <div class="personalized" ref="list">
            <div class="nav_title" @click="showAllList">
              推荐歌单
              <i :class="ShowAllList?'icon-down':'icon-right'"></i>
            </div>
            <div class="classView" v-for="(item, num) in recList.the_playlist" :key="num" @click="Details(item.id)">
              <img :src="item.picUrl" width="126">
              <div class="title">{{item.name}}</div>
            </div>
          </div>
          <div class="personalized">
            <div class="nav_title">
              最新新歌
              <i class="icon-right"></i>
            </div>
            <div class="classView" v-for="(item, num) in recList.new_song" :key="num" @click="playSong(item.id)">
              <img :src="item.song.album.picUrl" width="126">
              <div class="title">{{item.name}}</div>
            </div>
          </div>
          <div class="personalized">
            <div class="nav_title">
              主播电台
              <i class="icon-right"></i>
            </div>
            <div class="classView" v-for="(item, num) in recList.djprogram" :key="num" @click="Details(item.id)">
              <img :src="item.picUrl" width="126">
              <div class="title">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MusicTop v-if="showTopList"></MusicTop>
    <BoutiqueList v-if="showBoutiqueList"></BoutiqueList>
    <DaysRecom v-if="showeRecommend"></DaysRecom>
  </div>
</template>

<script>
  // import carouselImg1 from '../../public/img/aij.jpg'
  import MusicTop from './musicTop/MusicTop'
  import DaysRecom from './days_Recommend/DaysRecom'
  import BoutiqueList from './BoutiqueList/BoutiqueList'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {SHOW_LIST_DETAILS, SHOW_TOP_LIST, SHOW_DAY_RECOMMEND, SHOW_BOUTIQUE_LIST} from '../../store/mutation-types'
  import BScroll from 'better-scroll'

  export default {
    created() {
      this.$nextTick(() => {
        // this.axios.get('https://music.163.com/#/playlist?id=2483495328')
        //   .then((res) => {
        //     console.log(res)
        //   })
        this.thePlaylist()
        this.getBannerData({axios: this.axios})
        this.RecommendScroll = new BScroll(this.$refs.RecommendView, {
          click: true
        })
      })
    },
    data() {
      return {
        ShowAllList: false,
        buttonIcon: [
          {'icon': 'icon-broadcasting', 'text': '私人FM'},
          {'icon': 'icon-timing', 'text': '每日推荐'},
          {'icon': 'icon-musicList', 'text': '歌单'},
          {'icon': 'icon-member', 'text': '排行榜'}
        ],
        classVal: '',
        showMusicTop: false
      }
    },
    computed: {
      ...mapState(['recList', 'recListTitle', 'BannerData', 'showTopList', 'showBoutiqueList', 'showeRecommend'])
    },
    methods: {
      ...mapMutations({
        showdetails: SHOW_LIST_DETAILS,
        showDaysListFun: SHOW_DAY_RECOMMEND,
        showBoutiqueFun: SHOW_BOUTIQUE_LIST,
        showTopListFun: SHOW_TOP_LIST
      }),
      ...mapActions(['Recommend_the_playlist', 'Recommend_new_music', 'Recommend_djprogram', 'getBannerData', 'listDetails', 'getMusicDetails']),
      thePlaylist() {
        this.Recommend_the_playlist(this.axios)
        this.Recommend_new_music(this.axios)
        this.Recommend_djprogram(this.axios)
      },
      recListFun(i) {
        return this.recListTitle[i]
      },
      Details(id) {
        this.listDetails({axios: this.axios, id})
          .then(
            this.RecommendScroll.refresh()
          )
      },
      playSong(val) {
        // console.log('a', val)
        this.getMusicDetails({axios: this.axios, id: val})
          .then(
            this.RecommendScroll.refresh()
          )
      },
      showAllList() {
        console.log(1)
        this.ShowAllList = !this.ShowAllList
        console.log(this.ShowAllList)
        if (this.ShowAllList) {
          this.$refs.list.style.height = '1910px'
        } else {
          this.$refs.list.style.height = '420px'
        }
      },
      showView(index) {
        if (index === 3) {
          this.showTopListFun(true)
        }
        if (index === 2) {
          this.showBoutiqueFun(true)
        }
        if (index === 1) {
          this.showDaysListFun(true)
        }
      }
    },
    components: {
      MusicTop,
      DaysRecom,
      BoutiqueList
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .RecommendView
    position: absolute
    top: 77px
    bottom: 0
    width: 100%
    overflow: hidden
    .red_bg
      margin-top: -300px
      position: absolute
      height: 410px
      width: 100%
      background: #e4463b
    .banner
      /deep/ .mu-carousel
        margin-top: 10px
        height: 144px !important
        position: relative
        text-align: center
        .mu-button
          margin: 0
          width: 16px
          height: 16px
          .mu-carousel-indicator-icon
            width: 8px
            height: 8px
        img
          width: 96%
          height: 144px
          border-radius: 6px
    .classButton
      padding: 20px 0
      display: flex
      border-bottom: 1px solid #f5f5f5
      .button
        flex: 1
        text-align: center
        .buttonIcon
          font-size: 22px
        p
          margin-top: 10px
    .list_container
      padding: 0 6px
      .personalized
        height: 420px
        overflow: hidden
        .nav_title
          height: 60px
          font-size: 18px
          font-weight: 600
          line-height: 60px
          i
            color: #b4b4b4
        .classView
          box-sizing: border-box
          padding: 2px
          display: inline-block
          /*float: left*/
          height: 180px
          overflow: hidden
          width: 33.333%
          text-align: center
          font-size: 13px
          color: #333333
          img
            width: 100%
            border-radius: 6px
          .title
            line-height: 20px
            height: 40px
            white-space: pre-wrap
            text-overflow: ellipsis
            overflow: hidden
            padding: 0
</style>
