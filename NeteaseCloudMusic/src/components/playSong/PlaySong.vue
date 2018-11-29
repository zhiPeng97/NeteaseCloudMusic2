<template>
  <div class="PlaySong" ref="playSong" v-if="playMusicList.length">
    <div class="playView" ref="playView" v-if="PlayView">
      <div class="bg">
        <img :src="coverUrl" alt="" width="100%" height="100%">
      </div>
      <div class="playContainer">
        <div class="nav">
          <mu-button icon @click="showPlayView">
            <i class="icon-left"></i>
          </mu-button>
          <div class="songList">
            <span class="name">{{playMusicList[playingSong].name}}</span>
            <span class="desc" v-for="(singer, snum) in playMusicList[playingSong].ar?playMusicList[playingSong].ar:playMusicList[playingSong].artists"
                  :key="snum">
              {{singer.name}}
            </span>
          </div>
          <mu-button class="search" icon style="font-size: 27px">
            <i class="icon-share"></i>
          </mu-button>
        </div>
        <div class="viewBox">
          <div class="img">
            <img :class="Animation?'Move':''" :src="coverUrl" alt="无法获取图片" width="260px"
                 height="260px">
          </div>
          <div class="desc">
            <div class="desc_button" v-for="(itemIcon, itemNum) in songIcon" :key="itemNum">
              <mu-button icon color="primary">
                <i :class="itemIcon"></i>
              </mu-button>
            </div>
          </div>
        </div>
          <div class="progressBar">
              <span class="currentTime">
            {{showCurrent}}
          </span>
            <v-touch>
              <div class="touchBox" @touchstart="touchstart" @touchmove="touchmove">
                <div class="overallLength" ref="overallLength"></div>
                <div class="progress" ref="proBar">
                  <div class="dot"></div>
                </div>
              </div>
            </v-touch>
              <span class="duration">
            {{showDuration}}
          </span>
          </div>
        <div class="songControl">
          <div class="buttonBox">
            <mu-button icon @click="cycleMoode">
              <i :class="singleCycle?'icon-single_cycle':'icon-circulation_list'"></i>
            </mu-button>
        </div>
          <div class="buttonBox">
            <mu-button icon style="font-size: 36px" @click="preSongFun(playingSong)">
              <i class="icon-prev_song"></i>
            </mu-button>
          </div>
          <div class="buttonBox">
            <mu-button icon style="font-size: 46px" @click="musicUrl(playingSong)">
              <i :class="PlayState?'icon-stop':'icon-play'" ref="songControlIcon"></i>
            </mu-button>
          </div>
          <div class="buttonBox">
            <mu-button icon style="font-size: 36px" @click="nextSongFun(playingSong)">
            <i class="icon-next_song"></i>
          </mu-button>
          </div>
          <div class="buttonBox">
            <mu-button icon @click="openBottomSheet">
              <i class="icon-musicList"></i>
            </mu-button>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <!---->
    <!-- 底部播放组件 -->
    <div class="bottom" v-show="!PlayView">
      <div class="playBox" ref="swiper">
        <div class="playList">
          <div class="songs" v-for="(val, index) in playMusicList" :key="index" v-show="index === playingSong">
            <div class="pic" @click="showPlayView()">
              <transition name="buttom_pik_move">
                <img :class="Animation?'Move':''" :src="val.al?val.al.picUrl:val.album.picUrl" width="40" height="40px">
              </transition>
            </div>
            <div class="text" @click="showPlayView">
              <div class="songName">
                {{val.name}}
              </div>
              <div class="arName" v-for="(item, num) in val.ar?val.ar:val.artists" :key="num">
                {{item.name}}
              </div>
            </div>
            <div class="button">
              <mu-button icon color="primary" @click="preSongFun(index)">
                <i class="icon-prev_song"></i>
              </mu-button>
              <mu-button icon color="primary" @click="musicUrl(index)">
                <i class="icon-play" ref="play_icon"></i>
              </mu-button>
              <mu-button icon color="primary" @click="nextSongFun(index)">
                <i class="icon-next_song"></i>
              </mu-button>
              <mu-button icon color="primary" @click="openBottomSheet">
                <i class="icon-musicList"></i>
              </mu-button>
            </div>
            <!-- audio 标签 -->
            <div class="music">
              <audio ref="audio" @timeupdate="timeupdate">
                <source :src="`https://music.163.com/song/media/outer/url?id=${val.id}.mp3`" type="audio/mpeg">
              </audio>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 播放列表 -->
    <div class="show_list" ref="showList">
      <mu-bottom-sheet
        :open.sync="open"
        ref="mu_play_list"
        style="border-top-left-radius:12px;
             border-top-right-radius:12px;
             max-height: 350px !important
            ">
        <mu-list @item-click="closeBottomSheet">
          <mu-sub-header style="font-size: 15px;color: #444;">播放列表</mu-sub-header>
          <div class="button_list" ref="button_list"
               style="max-height:302px;overflow: auto">
            <div>
              <mu-list-item button v-for="(vals, indexs) in playMusicList" :key="indexs" @click="listPlay(indexs)">
                <mu-list-item-title>
                  <div ref="activeList" :class="playingSong == indexs?'activeList':''">
                    <span class="index">{{indexs+1}} </span> &nbsp;&nbsp;
                    <span class="songName" style="font-size: 15px">{{vals.name}}</span> &nbsp;&nbsp;
                    <i class="arName" v-for="(item, num) in vals.ar" :key="num" style="color: #9c9c9c;font-size: 13px">
                      {{item.name}}
                    </i>
                  </div>
                </mu-list-item-title>
              </mu-list-item>
            </div>
          </div>
        </mu-list>
      </mu-bottom-sheet>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {STOP_PLLAY, NEXT_SONG, SHOWPLAYVIEW, CLEAR_LIST} from '../../store/mutation-types'

  export default {
    name: 'PlaySongButton',
    mounted() {
      this.$nextTick(() => {})
    },
    data() {
      return {
        playUrl: '',
        open: false,
        PlayState: false,
        songIcon: [
          'icon-praise_before',
          'icon-download',
          'icon-music',
          'icon-comment',
          'icon-more-if'
        ],
        singleCycle: false,
        Animation: false,
        currentTime: 0,
        duration: 0,
        touchStartX: 0,
        touchMoveX: 0,
        touchEndX: 0
      }
    },
    watch: {
      currentTime(newCurrent, oldCurrent) {
        if (this.PlayView) {
          this.$refs.proBar.style.width = newCurrent / this.duration * 100 + '%'
        }
        this.currentTime = newCurrent
        if (newCurrent >= this.duration) { // 判断音乐当前播放进度是否等于音乐时间总长度，如果等于 ，执行下一曲操作
          setTimeout(() => { // 两秒钟后执行下一曲操作
            if (!this.singleCycle) {
              this.nextSongFun(this.playingSong)
            }
          }, 2000)
        }
      },
      playingSong(newPlaying, oldPlaying) {
        if (newPlaying !== oldPlaying) {
        this.PlayState = true
        this.playFun(newPlaying)
        }
      }
    },
    computed: {
      /* 当前歌曲的时间长度 */
      showDuration() {
        if (this.duration > 0) {
          if (this.duration > 60) {
            let min = Math.floor(this.duration / 60)
            min = min < 10 ? '0' + min : min
            let sec = this.duration - (min * 60)
            sec = sec < 10 ? '0' + sec : sec
            return `${min} : ${sec}`
          }
          return `00 : ${this.duration}`
        }
        return '00 : 00'
      },
      /* 当前歌曲的播放时间进度 */
      showCurrent() {
        if (this.currentTime > 0) {
          if (this.currentTime > 60) {
            let min = Math.floor(this.currentTime / 60)
            min = min < 10 ? '0' + min : min
            let sec = this.currentTime - (min * 60)
            sec = sec < 10 ? '0' + sec : sec
            return `${min} : ${sec}`
          }
          if (this.currentTime < 10) {
            return `00 : 0${this.currentTime}`
          }
        }
        return '00 : 00'
      },
      ...mapState(['playMusicList', 'playState', 'playingSong', 'PlayView']),
      currentTimes: {
        get() {
          return this.$refs.audio[this.playingSong].currentTime
        }
      },
      coverUrl() {
        if (this.playMusicList[this.playingSong].al) {
          return this.playMusicList[this.playingSong].al.picUrl
        }
        if (this.playMusicList[this.playingSong].album) {
          return this.playMusicList[this.playingSong].album.picUrl
        }
        return null
        // playMusicList[playingSong].al?playMusicList[playingSong].al.picUrl:playMusicList[playingSong].album.picUrl
      }
    },
    methods: {
      ...mapMutations({
        stopPlay: STOP_PLLAY, // 该方法用与判断当前状态应为播放/暂停
        nextSong: NEXT_SONG, // 该方法用户执行下一曲、上一曲操作
        PlayViewFun: SHOWPLAYVIEW, // 显示隐藏播放页面
        clearList: CLEAR_LIST // 清空播放列表
      }),
      /* 上一曲 */
      preSongFun(i) {
        if (i > 0) {
          let count = i - 1
          this.nextSong(count)
          this.playFun(count)
        }
        if (i === 0) {
          let count = this.playMusicList.length - 1
          this.nextSong(count)
          this.playFun(count)
        }
        this.$refs.audio[i].pause()
        this.$refs.play_icon[i].className = 'icon-play'
        this.stopPlay(false)
      },
      /* 下一曲 */
      nextSongFun(i) {
        if (i < this.playMusicList.length - 1) {
          let count = i + 1
          this.nextSong(count)
          this.playFun(count)
        }
        if (i === this.playMusicList.length - 1) {
          let count = 0
          this.nextSong(count)
          this.playFun(count)
        }
        this.$refs.audio[i].pause()
        this.$refs.play_icon[i].className = 'icon-play'
        this.stopPlay(false)
      },
      /* 列表播放 */
      listPlay(i) {
        this.nextSong(i)
        this.playFun(i)
        this.PlayState = true
      },
      /* 音乐 URL */
      musicUrl(i) {
        this.$nextTick(() => {
          this.PlayState = !this.PlayState
          this.playFun(i)
        })
      },
      /* 播放 */
      playFun(i) {
        for (var k = 0; k < this.playMusicList.length; k++) {
          if (k !== i) {
            this.$refs.audio[k].pause()
            this.$refs.play_icon[i].className = 'icon-play'
          }
        }
        this.$nextTick(() => {
          if (this.PlayState) {
            this.$refs.audio[this.playingSong].play()
            this.Animation = true
            this.$refs.play_icon[i].className = 'icon-stop'
          } else {
            this.$refs.audio[i].pause()
            this.Animation = false
            this.$refs.play_icon[i].className = 'icon-play'
          }
        })
      },
      /* 获取当前歌曲的时间总长度和当前的播放进度 */
      timeupdate(e) {
        this.currentTime = Math.floor(e.target.currentTime) // 获取当前音乐播放时间进度
        this.duration = Math.floor(e.target.duration) // 获取当前歌曲的时间长度
      },
      /* 切换循环模式 */
      cycleMoode(index) {
        this.singleCycle = !this.singleCycle
      },
      /* 打开音乐播放列表 */
      openBottomSheet() {
        this.open = true
      },
      /* 关闭音乐播放列表 */
      closeBottomSheet() {
        this.open = false
      },
      /* 展示音乐播放主页面 */
      showPlayView() {
        if (this.PlayView) {
          this.$refs.playSong.style.height = '50px'
          this.PlayViewFun(false) // 隐藏播放主体组件
        } else {
          this.$refs.playSong.style.height = '100%'
          this.PlayViewFun(true) // 显示播放主体组件
        }
      },
      /* 点击触摸事件 */
      touchstart(e) {
        this.touchStartX = e.touches[0].pageX - 70
        this.$refs.proBar.style.width = this.touchStartX + 'px'
        let overalX = this.$refs.overallLength.offsetWidth
        let num = this.duration * (this.touchStartX / overalX)
        this.$refs.audio[this.playingSong].currentTime = num
      },
      /* 按压移动事件 */
      touchmove(e) {
        let moveX = e.touches[0].pageX - 70 // 移动的X值
        let overalX = this.$refs.overallLength.offsetWidth // 进度条总长度
        if (moveX < 0) {
          moveX = 0
        }
        if (moveX > overalX) {
          moveX = overalX
        }
        this.$refs.proBar.style.width = moveX + 'px'
        let num = this.duration * (moveX / overalX)
        this.$refs.audio[this.playingSong].currentTime = num
      }
    }
  }
</script>

<style scoped lang="sass" rel="stylesheet/scss">
  .PlaySong
    position: fixed
    /*top: 0*/
    bottom: 0
    left: 0
    height: 0
    width: 100%
    z-index: 210
    .playView
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      background: #999
      z-index: 210
      box-sizing: border-box
      color: rgba(255, 255, 255, 0.65)
      .bg
        position: fixed
        top: 0
        bottom: 0
        left: 0
        width: 100%
        z-index: -1
        filter: blur(80px)
        -webkit-filter: blur(80px)
        -moz-filter: blur(80px)
        -ms-filter: blur(80px)
        -o-filter: blur(80px)
      .playContainer
        background: rgba(0, 0, 0, 0.2)
        height: 100%
        .nav
          display: flex
          padding: 12px 0
          height: 64px
          line-height: 40px
          color: #e7e8e7
          /deep/ .mu-button
            padding: 0
          .songList
            flex: 1
            height: 54px
            overflow: hidden
            .name
              display: block
              font-weight: 500
              font-family: 微软雅黑
              font-size: 17px
              color: #fefefe
              line-height: 24px
              height: 24px
              width: 260px
              text-overflow: ellipsis
              white-space: normal
              overflow: hidden
            .desc
              display: inline-block
              margin-right: 10px
              line-height: 22px
              vertical-align: top
              overflow: hidden
              white-space: nowrap
              text-overflow: ellipsis
              font-weight: 300
              font-size: 13px
              color: rgba(217, 218, 217, 0.72)
          /deep/ .mu-button
            flex: 0 48px
            padding: 0
            width: 50px
            border-radius: 0
            font-size: 26px
        .viewBox
          width: 100%
          text-align: center
          vertical-align: center
          .img
            margin: 20% auto
            border-radius: 50%
            width: 270px
            height: 270px
            border: 5px solid rgba(255, 255, 255, 0.25)
            img
              border-radius: 50%
            /* 自定义动画 rotate 周期 20秒循环一次 linear是贝塞尔曲线 infinite：开启动画无限循环*/
            .Move
              animation: rotate 20s linear infinite
          .desc
            height: 50px
            display: flex
            padding: 0 26px
            .desc_button
              flex: 1
              button
                height: 50px
                width: 50px
                font-size: 27px
        .progressBar
          box-sizing: border-box
          padding: 0 70px
          width: 100%
          height: 58px
          position: relative
          .touchBox
            height: 58px
            padding-top: 26px
            .overallLength
              width: 100%
              height: 2px
              background: rgba(212, 212, 212, 0.5)
            .progress
              position: relative
              margin-top: -2px
              background: #95b6f1
              height: 2px
              max-width: 100% !important
              .dot
                position: absolute
                top: -4px
                right: -4px
                width: 10px
                height: 10px
                background: #8caef0
                border: 3px solid #fffbf9
                border-radius: 50%
          .currentTime
            position: absolute
            top: 21px
            left: 24px
            width: 40px
            font-size: 10px
            line-height: 10px
          .duration
            position: absolute
            top: 21px
            right: 24px
            width: 40px
            font-size: 10px
            line-height: 10px
        .songControl
          width: 100%
          padding: 10px
          padding-top: 0
          display: flex
          .buttonBox
            flex: 1
            text-align: center
            button
              font-size: 28px
    .bottom
      position: fixed
      bottom: 0
      left: 0
      height: 50px
      width: 100%
      background: #fafafa
      .playBox
        position: relative
        .playList
          height: 50px
          font-size: 12px
          color: #333
          .songs
            padding-right: 96px
            width: 100%
            display: inline-block
            height: 50px
            position: relative
            .pic
              display: inline-block
              padding-top: 5px
              padding-left: 5px
              img
                border-radius: 50%
              .Move
                animation: rotate 8s linear infinite
            .text
              display: inline-block
              height: 50px
              padding: 6px 0
              vertical-align: top
              .arName
                display: inline-block
            .button
              position: absolute
              z-index: 211
              background: #fafafa
              right: 0
              color: #333
              top: 0
    .activeList
      color: #f10000
    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>
