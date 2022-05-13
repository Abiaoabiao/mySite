import Mock from "mockjs";

Mock.mock("/api/banner", "get", {
  code: 0,
  msg: "",
  data: [
    {
      id: "2",
      midImg: 'https://www.zhua91.com/img/bg02.03bb3b2f.jpg',
      bigImg: 'https://www.zhua91.com/img/bg02.03bb3b2f.jpg',
      title: "血火同源",
      description: "如果我回头，一切都完了",
    },
    {
      id: "1",
      midImg:
        "https://wx4.sinaimg.cn/large/0071Aw3ily8h14wqis78ij31hc0u07e3.jpg",
      bigImg:
        "https://wx4.sinaimg.cn/large/0071Aw3ily8h14wqis78ij31hc0u07e3.jpg",
      title: "凛冬将至",
      description: "人唯有恐惧的时候方能勇敢",
    },
    {
      id: "3",
      midImg: "https://wx4.sinaimg.cn/large/0071Aw3ily8h14wqm6t4oj31x70u0141.jpg",
      bigImg: "https://wx4.sinaimg.cn/large/0071Aw3ily8h14wqm6t4oj31x70u0141.jpg",
      title: "听我怒吼",
      description: "兰尼斯特有债必偿",
    },
    {
      id: "4",
      midImg: "https://images5.alphacoders.com/100/1003363.jpg",
      bigImg: "https://images5.alphacoders.com/100/1003363.jpg",
      title: "天氣之子",
      description: "我只不过……想再见她一次",
    },
    {
      id: "5",
      midImg: "https://pic3.zhimg.com/v2-92cdf79843a76f64a69a8614a98a4aba_r.jpg",
      bigImg: "https://pic3.zhimg.com/v2-92cdf79843a76f64a69a8614a98a4aba_r.jpg",
      title: "你好世界",
      description: "“♥”我喜欢你！！！一行同学“♥”| 你好世界",
    },
    {
      id: "6",
      midImg: "https://wx4.sinaimg.cn/large/0071Aw3ily8h162szdrtlj311h0l54qp.jpg",
      bigImg: "https://wx4.sinaimg.cn/large/0071Aw3ily8h162szdrtlj311h0l54qp.jpg",
      title: "你好世界",
      description: "“♥”我喜欢你！！！一行同学“♥”| 你好世界",
    },
  ],
});
