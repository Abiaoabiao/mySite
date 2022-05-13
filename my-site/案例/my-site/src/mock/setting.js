import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://wx3.sinaimg.cn/orj360/0071Aw3ily8h11fh9bn72j30hs0hsq3i.jpg",
    siteTitle: "留白",
    github: "https://github.com/Abiaoabiao/vue2.git",
    qq: "1718002347",
    qqQrCode:
      "https://wx3.sinaimg.cn/orj360/0071Aw3ily8h11gfedfirj30a709w75n.jpg",
    weixin: "LiuBai",
    weixinQrCode:
      "https://wx3.sinaimg.cn/orj360/0071Aw3ily8h11hgt41gmj30ku0madkq.jpg",
    mail: "1718002347@qq.com",
    icp: "湘ICP备17001719号",
    githubName: "Liubai-Personal",
    favicon: "https://wx3.sinaimg.cn/orj360/0071Aw3ily8h12dbt9ynoj30f40algnd.jpg",
  },
});
