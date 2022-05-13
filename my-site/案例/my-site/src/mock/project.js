import Mock from "mockjs";

Mock.mock(/^\/api\/project\/?$/, "get", {
  code: 0,
  msg: "",
  data: [
    {
      id: "@uuid",
      name: "像素鸟",
      url: 'https://abiaoabiao.github.io/pxbird/',
      github: 'https://github.com/Abiaoabiao/Abiaoabiao.github.io/tree/main/pxbird',
      "description|1-4": ["@cparagraph(1, 5)"],
      thumb: "https://wx4.sinaimg.cn/orj360/0071Aw3ily8h14kkmog0lj30ru0mttfw.jpg",
    },
    {
      id: "@uuid",
      name: "学生管理系统（登录版）",
      url: 'https://abiaoabiao.github.io/jsStudent/pages/register.html',
      github: 'https://github.com/Abiaoabiao/Abiaoabiao.github.io/blob/main/jsStudent',
      "description|1-4": ["@cparagraph(1, 5)"],
      thumb: "https://wx2.sinaimg.cn/orj360/0071Aw3ily8h14kkspuw6j31hc0outcd.jpg",
    },
    {
      id: "@uuid",
      name: "音乐播放器",
      url: 'https://abiaoabiao.github.io/musicplayer/dist/html/',
      github: 'https://github.com/Abiaoabiao/Abiaoabiao.github.io/tree/main/musicplayer',
      "description|1-4": ["@cparagraph(1, 5)"],
      thumb: "https://wx1.sinaimg.cn/orj360/0071Aw3ily8h14kkp9u17j30dy0m2t9e.jpg",
    },
    {
      id: "@uuid",
      name: "jq版京东界面",
      url: 'https://abiaoabiao.github.io/jqJD/html/',
      github: 'https://github.com/Abiaoabiao/Abiaoabiao.github.io/tree/main/jqJD',
      "description|1-4": ["@cparagraph(1, 5)"],
      thumb: "https://wx1.sinaimg.cn/orj360/0071Aw3ily8h14kkwv89pj31hc0u0gsi.jpg",
    },
    {
      id: "@uuid",
      name: "@ctitle(1, 10)",
      "url|1": ["@url", null],
      "github|1": ["@url", null],
      "description|1-4": ["@cparagraph(1, 5)"],
      thumb: "@image(300x250, @color, #fff, @natural)",
    },
  ],
});
