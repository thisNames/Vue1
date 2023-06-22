/*
  请求地址:https://api.seniverse.com/v3/weather/daily.json
  请求方法:get/post
  请求参数:location(城市名) key (密钥) https://free-api.com/doc/559
  响应内容:天气信息

  1. 点击回车
  2. 查询数据
  3. 渲染数据
  */

// 创建 Vue 实例对象
const app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherList: [],
        title: "q"
    },
    methods: {
        searchWeather: function ()
        {
            // 保存 this
            let self = this;

            if (this.city.trim() == "")
            {
                console.log("null");
                return;
            }

            console.log(this.city, "天气查询");

            // 调用接口，发送请求
            axios.get(`https://api.seniverse.com/v3/weather/daily.json?key=SCYrvkytJze9qyzOh&location=${this.city.trim()}`)
                .then(res =>
                {
                    console.log(...res.data.results[0].daily);
                    self.weatherList = [...res.data.results[0].daily];
                    self.title = self.city;
                })
                .catch(err =>
                {
                    const d = new Date();
                    let year = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let day = d.getDate()

                    self.title = "请输出正确的城市 | 代码 | 暂不支持此城市";
                    let time = `${year} 年 ${month} 月 ${day}`;

                    console.log("请求失败", err);
                    self.weatherList = [{
                        text_day: "请求失败",
                        low: "暂无",
                        high: "暂无",
                        date: time
                    }];
                })
                .finally(() =>
                {
                    console.log("请求成功");
                    console.log(self.weatherList);
                })
        },
        changeCity: function (city)
        {
            this.city = city;
            console.log(city);
            this.searchWeather();
        }
    }
})
