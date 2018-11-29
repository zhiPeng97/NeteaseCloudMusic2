import Vue from 'vue'
import Router from 'vue-router'
import MyMusicView from '../components/myMusic/MyMusicView'
import RecommendView from '../components/recommend/RecommendView'
import VideoView from '../components/video/VideoView'
import VideoDetails from '../components/video/VideoDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mymusic',
      name: 'MyMusicView',
      component: MyMusicView
    },
    {
      path: '/recommend',
      name: 'RecommendView',
      component: RecommendView
    },
    {
      path: '/video',
      name: 'VideoView',
      component: VideoView
    },
    {
      path: '/videoDetails',
      name: 'VideoDetails',
      component: VideoDetails
    }
  ]
})
