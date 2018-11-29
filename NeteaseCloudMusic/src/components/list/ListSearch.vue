<template>
  <div class="ListSearch">
    <div class="top_bg">
      <img :src="listDetails.coverImgUrl" width="100%" height="260">
    </div>
    <!-- 顶部 -->
    <div class="top">
      <mu-button icon @click="closeSearch(false)">
        <i class="icon-left"></i>
      </mu-button>
      <input type="text" v-model="searchVal" placeholder="搜索歌单内歌曲">
      <div v-show="searchVal !== ''" class="search_star" @click="searchStar">搜素</div>
    </div>
    <!-- 加载动画 -->
    <div class="loader" v-if="!searchResult.length">
      <mu-circular-progress class="demo-circular-progress" color="#df4238" :size="50"
                            style="display:block;margin:60px auto 0;">
      </mu-circular-progress>
      <p>正在加载</p>
    </div>
    <div class="text">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
    <!-- 列表-->
    <div class="song_list" ref="search_result" v-if="searchResult.length">
      a
      <div class="list_content">
        <mu-list textline="two-line">
          <mu-list-item avatar button v-for="(val, index) in searchResult" :key="index"
                        @click="playMusic(val)">
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
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {SHOW_LIST_SEARCH} from '../../store/mutation-types'

  export default {
    name: 'ListSearch',
    data() {
      return {
        searchVal: '',
        searchResult: []
      }
    },
    computed: {
      ...mapState(['listDetails'])
    },
    methods: {
      ...mapMutations({
        closeSearch: SHOW_LIST_SEARCH
      }),
      searchStar() {
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .ListSearch
    position: fixed
    top: 0
    bottom: 0
    left: 0
    width: 100%
    font-family: 宋体
    background: #fff
    z-index: 222
    .text
      width: 100%
      height: 50px
      line-height: 50px
      font-size: 30px
      text-align: center
      transition: all .5s linear
      ul
        width: 300%
        display: block
        transition: all .5s linear
        li
          display: inline-block
          float: left
          width: 33.3%
    .top_bg
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 60px
      overflow: hidden
      background: rgba(0, 0, 0, 0.4)
      z-index: -1
      img
        filter: blur(80px)
    .top
      padding-top: 10px
      height: 60px
      /*background: #dd4137*/
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
        background: rgba(255, 255, 255, 0)
        color: rgba(255, 255, 255, 0.9)
        box-shadow: none
        outline: none
        border: none
        border-bottom: 1px solid rgba(255, 255, 255, 0.55)
    .loader
      font-size: 17px
      line-height: 60px
      text-align: center
</style>
