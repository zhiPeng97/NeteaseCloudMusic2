<template>
  <div class="top">
    <div class="left">
      <div @click="showSides(true)">
        <mu-button icon color="primary">
          <i class="icon-more"></i>
        </mu-button>
      </div>
    </div>
    <div class="button">
      <mu-button icon color="primary" @click="buttonNum(0)">
        <i class="bigicon icon-mymusic" :class="active===0?'active':''"></i>
      </mu-button>
      <mu-button icon color="primary" @click="buttonNum(1)">
        <i class="icon icon-music" :class="active===1?'active':''"></i>
      </mu-button>
      <mu-button icon color="primary" @click="buttonNum(2)">
        <i class="icon icon-video" :class="active===2?'active':''"></i>
      </mu-button>
    </div>
    <div class="right">
      <mu-button icon color="primary" @click="showSearchFun">
        <i class="icon-search"></i>
      </mu-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {TOGGLE_COLUMN, CHANGE_ACTIVE, SHOW_ALL_SEARCH} from '../../store/mutation-types'

  export default {
    name: 'TopBar',
    data() {
      return {
        active: 0
      }
    },
    computed: {
      ...mapState({})
    },
    methods: {
      ...mapMutations({
        showSides: TOGGLE_COLUMN,
        changeActive: CHANGE_ACTIVE,
        showAllSearch: SHOW_ALL_SEARCH
      }),
      buttonNum(val) {
        this.active = val
        this.changeActive(val)
      },
      showSearchFun() {
        this.showAllSearch(true)
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .top
    display: flex
    padding-top: 26px
    background: #e5463b
    .left
      flex: 0 0 48px
      i
        font-size: 30px
        color: #fff
    .button
      flex: 1
      margin: 0 auto
      width: 180px
      text-align: center
      .mu-button
        padding: 12px 15px
        width: 50px
        font-size: 30px
        line-height: 30px
        color: #ff8c89
        .bigicon
          margin-top: -6px
        .active
          color: #fff
    .right
      flex: 0 0 48px
      margin-right: 4px
      i
        font-size: 22px
        color: #fff
</style>
