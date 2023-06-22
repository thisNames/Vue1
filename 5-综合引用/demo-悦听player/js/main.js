/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址

  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)

  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
    
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

const app = new Vue({
  el: "#player",
  data: {
    query: "",
    musicList: [],
    musicUrl: "",
    musicCover: "",
    hotComments: [],
    mvUrl: "",
    isPlaying: false,
    isMask: false,
  },
  methods: {
    // 查询歌曲
    searchMusic: function ()
    {
      if (this.query.trim() === "") return;
      let self = this;
      // 搜索歌曲
      axios.get(`https://autumnfish.cn/search?keywords=${this.query}`)
        .then(res =>
        {
          console.log(res);
          // 返回歌曲数据
          self.musicList = res.data.result.songs;
          // 获取 ID
          // console.log(res.data.result.songs);
        })
        .catch(err =>
        {
          console.error(err);
        })
    },
    // 获取歌曲的url地址
    playMusic: function (musicId)
    {
      let self = this;

      // 获取歌曲url
      axios.get(`https://autumnfish.cn/song/url?id=${musicId}`)
        .then(res => self.musicUrl = res.data.data[0].url)
        .catch(err => console.error(err))

      // 歌曲详情，获取歌曲封面url
      axios.get(`https://autumnfish.cn/song/detail?ids=${musicId}`)
        .then(res => self.musicCover = res.data.songs[0].al.picUrl)
        .catch(err => console.error(err))

      // 获取歌曲评论
      axios.get(`https://autumnfish.cn/comment/hot?type=0&id=${musicId}`)
        .then(res => self.hotComments = res.data.hotComments)
        .catch(err => console.error(err))
    },
    // 播放
    play: function ()
    {
      // console.log("play");
      this.isPlaying = true;
    },
    // 暂停
    pause: function ()
    {
      // console.log("pause");
      this.isPlaying = false;
    },
    // 播放MV
    playMv: function (mvid)
    {
      axios.get(`https://autumnfish.cn/mv/url?id=${mvid}`)
        .then(res =>
        {
          // 获取 mv url
          console.log(res.data.data.url);
          this.isMask = true;
          this.mvUrl = res.data.data.url;
        })
        .catch(err =>
        {
          console.error(err);
        }).finally(() => document.querySelector("video").play())

    },
    // 隐藏遮罩
    hide: function ()
    {
      this.isMask = false;
      document.querySelector("video").pause()
    }
  }
})
