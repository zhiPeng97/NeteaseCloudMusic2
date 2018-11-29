import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  loginState: false, // 登录状态
  Login: false,
  userData: [], // 用户信息数据
  userCollect: [], // 用户收藏
  userPlayList: [], // 用户播放列表
  commentActive: 0, // content内容显示区
  showAllSearch: false, // 显示全网搜索页面
  showListSearch: false, // 显示歌单搜索页面
  isAjax: false, // 判断是否正在请求网络数据
  playMusic: false, // 播放音乐
  showSide: false, // 显示侧边栏
  playHistory: [], // 播放历史
  playMusicList: [], // 正在播放的列表
  playState: false, // 暂停播放
  playingSong: 0, // 当期正在播放的音乐（序号）
  recList: {
    the_playlist: [], // 推荐歌单
    new_song: [], // 推荐新歌
    djprogram: [] // 推荐电台
  },
  recListTitle: {
    the_playlist: [], // 推荐歌单(前五条)
    new_song: [], // 推荐新歌(前五条)
    djprogram: [] // 推荐电台(前五条)
  },
  daysRecommend: [], // 每日推荐歌曲
  showeRecommend: false, // 显示每日推荐歌曲
  boutiqueList: [], // 精品歌单
  firstBoutiqueList: [], // 第一个精品歌单
  showBoutiqueList: false, // 显示精品歌单
  listDetails: [], // 歌单详情
  showListDetails: false, // 显示歌单详情
  showListMsg: false, // 显示歌单详情介绍
  BannerData: [], // 轮播图数据
  videoDatas: [], // 推荐 MV
  NewVideoDatas: [], // 最新 MV
  RelatedMvDatas: [], // 相关 MV
  SimilarityMv: [], // 相关MV 详细信息
  MvDatas: [], // Mv 详细信息
  // MvPlayUrl: [], // Mv播放地址
  search_history: [], // 搜索--历史记录
  PlayView: false, // 全屏显示音乐播放器
  officialList: {}, // 所有榜单内容摘要
  // worldList: [] // 全球榜单内容摘要
  showTopList: false // 是否显示排行榜
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
