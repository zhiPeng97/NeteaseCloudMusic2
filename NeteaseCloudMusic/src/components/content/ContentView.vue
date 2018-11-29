<template>
  <div class="ContentView">
    <!-- 页面内容 -->
    <ul class="comment">
      <li v-if="active === 0" class="mymusic">
        <MyMusicView></MyMusicView>
      </li>
      <li v-if="active === 1" class="music">
        <RecommendView></RecommendView>
      </li>
      <li v-if="active === 2" class="video">
        <VideoView></VideoView>
      </li>
    </ul>
  </div>
</template>

<script>
  import MyMusicView from '../myMusic/MyMusicView'
  import RecommendView from '../recommend/RecommendView'
  import VideoView from '../video/VideoView'
  import {mapState} from 'vuex'
  // import {} from '../../store/mutation-types'

  export default {
    name: 'ContentView',
    computed: {
      ...mapState({
        active: 'commentActive'
      })
    },
    components: {
      MyMusicView,
      RecommendView,
      VideoView
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">

</style>
