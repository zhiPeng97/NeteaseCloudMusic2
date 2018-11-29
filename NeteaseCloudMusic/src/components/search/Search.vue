<template>
  <div class="Search" ref="Search">
    <div class="top">
      <mu-button icon @click="closeSearch(false)">
        <i class="icon-left"></i>
      </mu-button>
      <input type="text" v-model="searchVal" :placeholder="recommend">
      <div v-show="searchVal !== ''" class="search_star" @click="searchStar">搜素</div>
    </div>
    <div v-if="!showSearchResult">
      <div class="container">
        <div class="search_title">
          热门搜索
        </div>
        <div class="loader" v-if="!hotSearch.length">
          <mu-circular-progress class="demo-circular-progress" color="#df4238" :size="50"
                                style="display:block;margin:60px auto 0;">
          </mu-circular-progress>
          <p>正在加载</p>
        </div>
        <div class="search_content">
          <div class="search_search_box" v-for="(hot, hotIndex) in hotSearch" :key="hotIndex"
               @click="searchTo(hot.first)">
            {{hot.first}}
          </div>
        </div>
      </div>
      <div class="container">
        <div class="search_title">
          历史记录
          <span @click="clearHistoryFun">清除</span>
        </div>
        <div class="search_content">
          <div class="search_search_box" v-for="(history, hisIndex) in search_history" :key="hisIndex"
               @click="searchTo(history)">
            {{history}}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSearchResult" class="search_result">
      <div class="result_top">
        <mu-list class="mu_result_top">
          <mu-list-item button class="result_top_box"
                        v-for="(item, index) in searchTypes"
                        @click="changeSearchType(index)" :key="index">
          <span>
            <i :class="searchType==index?'typeActive':''">
              {{item}}
            </i>
          </span>
          </mu-list-item>
        </mu-list>
      </div>
      <!-- 歌曲 -->
      <div ref="song" class="result_songs" v-if="searchType == 1">
        <mu-list v-if="searchResult[searchType].length">
          <mu-list-item button v-for="(songVal, songIndex) in searchResult[searchType][0].songs"
          :key="songIndex" @click="playMusic(songVal.id)">
            <div class="left">
              <div class="songName">
                {{songVal.name}}
              </div>
              <span class="songArt" v-for="(artist, artistIndex) in songVal.artists" :key="artistIndex">
                  {{artist.name}}
              </span>
            </div>
            <mu-button icon>
              <i class="icon-more-if"></i>
            </mu-button>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {SEARCH_HISROTY, CLEAR_SEARCH_HISROTY, SHOWPLAYVIEW, SHOW_ALL_SEARCH, CHANGE_PLAYING} from '../../store/mutation-types'
  import BScroll from 'better-scroll'

  export default {
    name: 'Search',
    created() {
      /* 热门搜索 */
      this.axios.get('/api/search/hot')
        .then((res) => {
          this.hotSearch = res.data.result.hots
        })
    },
    data() {
      return {
        hotSearch: [],
        recommend: '天真',
        searchVal: '',
        searchType: 1,
        searchTypes: {
          '1': '歌曲',
          '1000': '歌单',
          '1004': 'MV',
          '1014': '视频'
        },
        searchResult: {
          '1': [],
          '1000': [],
          '1004': [],
          '1014': []
        },
        showSearchResult: false
      }
    },
    watch: {
      searchType(newType, oldType) {
        if (newType !== oldType) {
          this.searchFun(this.searchType)
        }
      },
      PlayView(newView, oldView) {
        if (newView === true) {
          this.$refs.Search.style['z-index'] = 0
        } else {
          this.$refs.Search.style['z-index'] = 220
        }
      }
    },
    computed: {
      ...mapState(['search_history', 'PlayView'])
    },
    methods: {
      ...mapMutations({
        pushHistory: SEARCH_HISROTY,
        clearHistory: CLEAR_SEARCH_HISROTY,
        showPlayView: SHOWPLAYVIEW,
        closeSearch: SHOW_ALL_SEARCH,
        changePlayingSong: CHANGE_PLAYING
      }),
      ...mapActions({
        getMusicDetails: 'getOneMusic'
      }),
      searchTo(val) {
        this.searchVal = val
      },
      /* 开始搜索 */
      searchStar() {
        this.searchFun(1)
        /* 把搜索内容push到历史记录中 */
        this.pushHistory({'text': this.searchVal})
      },
      /* 搜索结果 */
      searchFun(i) {
        this.axios.get('/api/search?keywords=' + this.searchVal + '&type=' + i)
          .then((res) => {
            this.searchResult[i].push(res.data.result)
            this.showSearchResult = true
            this.BScroll()
          })
      },
      /* 更改搜索类型 */
      changeSearchType(index) {
        this.searchType = index
      },
      clearHistoryFun() {
        this.clearHistory()
      },
      playMusic(id) {
        this.getMusicDetails({id: id})
          .then(() => {
            this.showPlayView(true)
          })
        // this.showPlayView(true)
        if (this.PlayView) {
          this.$refs.Search.style['z-index'] = 0
        } else {
          this.$refs.Search.style['z-index'] = 220
        }
      },
      BScroll() {
        this.$nextTick(() => {
          this.songBScroll = new BScroll(this.$refs.song, {
            click: true
          })
        })
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .Search
    position: fixed
    top: 0
    bottom: 0
    left: 0
    width: 100%
    font-family: 宋体
    background: #fff
    z-index: 222
    .top
      padding-top: 10px
      height: 60px
      background: #dd4137
      display: flex
      button
        flex: 0 0 50px
        margin: 0
        padding: 0
        height: 50px
        color: rgba(255, 255, 255, 0.8)
      .search_star
        width: 44px
        font-size: 17px
        line-height: 50px
        color: rgba(255, 255, 255, 0.93)
      input
        flex: 1
        margin: 10px 10px 0 0
        line-height: 30px
        font-size: 17px
        height: 30px
        background: #dd4137
        color: rgba(255, 255, 255, 0.9)
        box-shadow: none
        outline: none
        border: none
        border-bottom: 1px solid rgba(255, 255, 255, 0.55)
    .container
      .search_title
        margin-top: 12px
        font-size: 16px
        line-height: 38px
        font-weight: 600
        span
          float: right
          padding-right: 10px
          font-weight: 300
          font-size: 14px
      .search_content
        .search_search_box
          display: inline-block
          margin: 5px
          padding: 6px 13px
          font-weight: 500
          background: #f3f3f3
          border-radius: 16px
      .loader
        font-size: 17px
        line-height: 60px
        text-align: center
    .search_result
      .result_top
        .mu_result_top
          display: flex
          height: 34px
          background: #dd4137
        .result_top_box
          flex: 1
          color: rgba(255, 255, 255, 0.7)
          height: 34px
          line-height: 32px
        /deep/ .mu-list
          margin: 0
          padding: 0
          .mu-item
            padding: 0
            height: 34px
            span
              width: 100%
              text-align: center
              i
                color: rgba(255, 255, 255, 0.75)
                text-align: center
                /*width: 100%*/
                height: 28px
                line-height: 28px
                &.typeActive
                  padding: 0 4px 3px 4px
                  font-weight: 600
                  color: rgba(255, 255, 255, 0.91)
                  border-bottom: 2px solid rgba(255, 255, 255, 0.91)
      .result_songs
        position: absolute
        top: 94px
        left: 0
        width: 100%
        bottom: 0
        overflow: hidden
        .mu-list
          padding: 10px 0 50px
          /deep/ .mu-item
            display: flex
            padding: 20px
            position: relative
            width: 100%
            height: 56px
            border-bottom: 1px solid #e1e1e1
            .left
              flex: 1
              .songName
                max-width: 270px
                font-size: 16px
                white-space: nowrap
                text-overflow: ellipsis
                overflow: hidden
              .songArt
                font-size: 13px
                color: #7f7f7f
            /deep/button
              float: right
      a
</style>
