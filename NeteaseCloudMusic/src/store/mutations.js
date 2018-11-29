import * as types from './mutation-types'

export default {
  [types.USER_LOGIN](state, data) {
    state.loginState = data
  },
  // [types.REFRESH_AJAX](state, stutas) {
  //   state.isAjax = stutas
  // },
  [types.RECEIVE_DATA](state, data) {
    state.data = data
  },
  [types.TOGGLE_COLUMN](state, val) {
    state.showSide = val
  },
  /* 更改当前显示组页面 */
  [types.CHANGE_ACTIVE](state, val) {
    state.commentActive = val
  },
  /* 显示歌单详情 */
  [types.SHOW_LIST_DETAILS](state, val) {
    state.showListDetails = val
  },
  /* 显示歌单详情介绍信息 */
  [types.SHOW_LIST_MSG](state, val) {
    state.showListDetails = val
  },
  /* 破防暂停 */
  [types.STOP_PLLAY](state, val) {
    state.playState = val
  },
  /* 换曲 */
  [types.NEXT_SONG](state, val) {
    state.playingSong = val
    console.log(state.playingSong)
  },
  /* 清空播放列表 */
  [types.CLEAR_LIST](state) {
    state.playMusicList = []
    console.log(state.playMusicList)
  },
  /* 相关MV */
  [types.SIMILARITY_MV](state, val) {
    state.SimilarityMv = val
  },
  /* 全网搜索 */
  [types.SHOW_ALL_SEARCH](state, val) {
    state.showAllSearch = val
  },
  /* 歌单内搜索 */
  [types.SHOW_LIST_SEARCH](state, val) {
    state.showListSearch = val
  },
  /* 搜索（历史记录 ） */
  [types.SEARCH_HISROTY](state, val) {
    state.search_history.push(val.text)
  },
  /* 清空搜索历史记录 */
  [types.CLEAR_SEARCH_HISROTY](state) {
    state.search_history = []
  },
  /* 切换歌单 */
  [types.CHANGE_PLAY_LIST](state, val) {
    state.playMusicList = state.listDetails.tracks
    console.log(state.playMusicList)
    state.playingSong = val.index
    console.log(state.playingSong)
  },
  /* 显示、隐藏播放器主页面 */
  [types.SHOWPLAYVIEW](state, val) {
    state.PlayView = val
  },
  /* 点击歌曲切换播放器当前播放歌曲的索引值 playingSong */
  [types.CHANGE_PLAYING](state, val) {
    state.playingSong = state.playMusicList.length
  },
  /* 清空正在播放的列表 */
  [types.CLEARPLAYLIST](state, val) {
    state.playMusicList = []
  },
  /* 显示隐藏排行榜 */
  [types.SHOW_TOP_LIST](state, val) {
    state.showTopList = val
  },
  /* 显示精品歌单 */
  [types.SHOW_BOUTIQUE_LIST](state, val) {
    state.showBoutiqueList = val
  },
  /* 显示每日推荐 */
  [types.SHOW_DAY_RECOMMEND](state, val) {
    state.showeRecommend = val
    console.log(state.showeRecommend)
  }
}
