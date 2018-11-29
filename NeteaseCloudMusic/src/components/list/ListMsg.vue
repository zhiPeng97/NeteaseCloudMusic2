<template>
  <div class="ListMsg">
    <div class="bg">
      <img :src="listDetails.coverImgUrl" width="100%" height="100%">
    </div>
    <div class="listMsgContainer">
      <div class="top">
        <mu-button icon @click="$emit('showListMsg')">×</mu-button>
      </div>
      <div class="middle">
        <div class="img">
          <img :src="listDetails.coverImgUrl" width="230" alt="">
        </div>
        <div class="title">
          {{listDetails.name}}
        </div>
      </div>
      <div class="split"></div>
      <div class="msg">
        <div class="types">
          标签：
          <span v-for="(type, num) in listDetails.tags" :key="num">
            {{type}}
        </span>
        </div>
        <div class="description">
          <div>
            {{listDetails.description}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'ListMsg',
    computed: {
      ...mapState(['listDetails'])
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .ListMsg
    position: fixed
    top: 0
    bottom: 0
    left: 0
    width: 100%
    background: rgba(138, 124, 95, 0.94)
    z-index: 1000
    .bg
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      z-index: -1
      img
        filter: blur(60px)
    .listMsgContainer
      /*background: rgba(0, 0, 0, 0.2)*/
      .top
        padding: 20px 10px 20px 0
        height: 70px
        button
          font-size: 36px
          font-weight: 100
          float: right
          color: rgba(255, 255, 255, 0.93)
      .middle
        margin-top: 24px
        text-align: center
        .img
        .title
          padding: 20px 10px 20px 10px
          line-height: 20px
          font-size: 20px
          font-family: 微软雅黑
          color: #fff
          text-align: center
          text-overflow: ellipsis
          white-space: nowrap
          overflow: hidden
      .split
        margin: 0 auto
        height: 1px
        width: 50%
        background: rgba(255, 255, 255, 0.28)
        box-shadow: white
      .msg
        padding: 24px 27px 0
        color: rgba(255, 255, 255, 0.9)
        font-weight: 300
        .types
          font-size: 15px
          span
            margin-right: 4px
            padding: 2px 4px
            font-size: 12px
            border-radius: 10px
            border: 1px solid rgba(255, 255, 255, 0.9)
        .description
          margin: 10px 2px 0
          max-height: 200px
          overflow: auto
    .a
</style>
