// import * as types from './mutation-types'

import * as types from './mutation-types'
import Vue from 'vue'

export default {
  /* 退出登录 */
  loginOut({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/logout')
        .then((res) => {
          if (res.status) {
            state.userData = {}
          }
          resolve() // 上面的都执行完毕后，执行调用方法的 .then()
        })
    })
  },
  /* 获取用户信息 , 歌单，收藏，mv, dj 数量 */
  userCollect({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/user/subcount')
        .then((res) => {
          state.userCollect = res
        })
    })
  },
  /* 获取用户歌单 */
  userPlaylist({state}, payload) {
    return new Promise(resolve => {
      // /user/playlist?uid=32953014
      Vue.axios.get('/api/user/playlist?uid=' + payload.id)
        .then((res) => {
          state.userPlayList = res.data.playlist
        })
    })
  },
  /* 获取精品歌单 */
  getBoutiqueList({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/top/playlist/highquality&limit=21')
        .then((res) => {
          state.firstBoutiqueList = res.data.playlists.slice(0, 1)
          state.boutiqueList = res.data.playlists.slice(1, 21)
        })
    })
  },
  /* 获取推荐 歌单 */
  Recommend_the_playlist({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/personalized')
        .then((res) => {
          state.recList.the_playlist = res.data.result
          state.recListTitle.the_playlist = res.data.result.slice(0, 6)
        })
    })
  },
  /* 获取歌单详情 */
  listDetails({state, commit}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/playlist/detail?id=' + payload.id)
        .then((res) => {
          state.listDetails = res.data.playlist
          commit(types.SHOW_LIST_DETAILS, true)
          resolve() // 上面的都执行完毕后，执行调用方法 .then()
        })
    })
  },
  /* 获取推荐新歌 */
  Recommend_new_music({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/personalized/newsong')
        .then((res) => {
          state.recList.new_song = res.data.result
          state.recListTitle.new_song = res.data.result.slice(0, 6)
          // state.recListTitle.new_song = res.data.result.slice(0, 6)
        })
    })
  },
  /* 获取音乐详情 并push到播放列表 */
  getMusicDetails({state, dispatch, commit}, payload) {
    state.playMusicList = state.listDetails.tracks
    state.playingSong = payload.index
  },
  /* 将音乐详情 并push到播放列表 */
  getOneMusic({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/song/detail?ids=' + payload.id)
        .then((res) => {
          res = res.data.songs[0]
          state.playMusicList.push(res)
          state.playingSong = state.playMusicList.length - 1
          resolve()
        })
    })
  },
  /* 获取推荐 电台 */
  Recommend_djprogram({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/personalized/djprogram')
        .then((res) => {
          state.recList.djprogram = res.data.result
          state.recListTitle.djprogram = res.data.result.slice(0, 6)
        })
    })
  },
  /* 获取推荐 MV */
  getVideoDatas({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/personalized/mv')
        .then((res) => {
          state.videoDatas = res.data
        })
    })
  },
  /* 获取排行榜 MV */
  getNewVideoDatas({state, dispatch}, payload) {
    return new Promise(resolve => {
      let count = payload.count
      let offset = payload.MvPage
      Vue.axios.get('/api/top/mv?limit=' + count + '&offset=' + offset)
        .then((res) => {
          // state.NewVideoDatas = res.data
          for (let i = 0; i < res.data.data.length; i++) {
            let id = res.data.data[i].id
            dispatch('getMvDatas', {'axios': payload.axios, id: id})
          }
        })
    })
  },
  /* 获取相关 MV */
  getRelatedMvDatas({state, dispatch}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/simi/mv?mvid=' + payload.id)
        .then((res) => {
          state.RelatedMvDatas = res.data.mvs
          for (let i = 0; i < state.RelatedMvDatas.length; i++) {
            // let id = state.RelatedMvDatas.data[i].id
            dispatch('getMvDatas', {'axios': payload.axios, id: payload.id})
          }
        })
    })
  },
  /* 获取 MV 详细信息 */
  getMvDatas({state, commit}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/mv/detail?mvid=' + payload.id)
        .then((res) => {
          let data = res.data.data
          state.MvDatas.push(data)
          resolve()
        })
    })
  },
  /* 获取相似 MV 详细信息 */
  getSimilarityMv({state, commit}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/mv/detail?mvid=' + payload.id)
        .then((res) => {
          let data = res.data.data
          state.SimilarityMv.push(data)
        })
    })
  },
  /* 获取所有榜单摘要内容 */
  getAllTop({state, commit}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/toplist/detail')
        .then((res) => {
          state.officialList = res.data
        })
    })
  },
  /* 获取每日推荐歌曲 */
  getEveryDayRecommend({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/recommend/songs')
        .then((res) => {
          state.listDetails = res.data.recommend
          resolve()
        })
    })
  },
  /* 播放每日推荐歌曲 */
  playDaysMusic({state}, payload) {
    state.playMusicList = state.listDetails
    state.playingSong = payload.index
  },
  /* 获取轮播图数据 */
  getBannerData({state}, payload) {
    return new Promise(resolve => {
      Vue.axios.get('/api/banner')
        .then((res) => {
          state.BannerData = res.data.banners
          resolve() // 上面的都执行完毕后，执行调用方法的 .then()
        })
    })
  },
  /* 登录 */
  async getLogin({state, dispatch}, axios) {
    let loginData = `/login/cellphone?phone=${axios.id}&password=${axios.pwd}`
    // let phone = axios.id
    // let password = axios.pwd
    let self = await axios.axios.get('/api' + loginData
      // {params: {phone, password}}
    )
    // .then((res) => {
    //   resolve()
    // })
    // .catch(() => {
    //   reject(new Error(''))
    // })
    let userId = self.data.profile.userId
    if (userId) {
      // http://localhost:3000/user/detail?uid=296536574
      let getUserData = `/user/detail?uid=${userId}`
      let userData = await axios.axios.get('/api' + getUserData)
      state.userData = userData.data
      let id = userData.data.profile.userId
      if (userData.data.adValid) {
        state.Login = true
        state.loginState = false
        dispatch('userCollect', axios)
        dispatch('userPlaylist', {axios: axios, id: id})
      }
    } else {
      state.loginState = true
    }
  }
}
