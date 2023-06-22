
// 创建 Vue 对象实例
let app = new Vue({
  el: "#todoapp",
  data: {
    list: ["吃饭饭", "睡觉觉", "打代码"],
    inputValue: "打代码"
  },
  methods: {
    add: function ()
    {
      let data = this.inputValue.trim()
      if (data != "")
      {
        this.list.push(this.inputValue);
      }
      else
      {
        console.log("null");
      }
    },
    remove: function (index)
    {
      console.log("remove", index);
      this.list.splice(index, 1);
    },
    clear: function ()
    {
      this.list = [];
    }
  }
});