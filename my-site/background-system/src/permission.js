import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist 白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  // 获取本地用户信息
  const hasGetUserInfo = store.getters.user; 

  if (to.meta.auth) {
    // 进入if说明需要鉴权
    if (hasGetUserInfo) {
      // 进入此if说明有用户信息
      next();
    } else {
      // 没有用户信息,看是否有Token
      const hasToken = localStorage.getItem('adminToken'); //从localStorage中取出Token
      if (hasToken) {
        // 有Token但是需要验证
        try {
          await store.dispatch('user/getInfo')
          next();
        } catch (err) {
          await store.dispatch('user/resetToken')
          Message.error('登录过期，请重新登录！')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        // 没有Token测重新进行登录
        Message.warning('请登录后再尝试哦')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    if (to.path == '/login' && hasGetUserInfo) {
      // 说明你现在是在登陆的状态下要去login页面
      next({path: '/'});
    } else {
      next();
    }
    NProgress.done()
  }


  //  下面是vue-element-admin的原本鉴权
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     // 进的不是login
  //     // 看一下是否由用户信息
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       // 没由用户信息，但是有token，接下来就是用localStorage的token去服务器拿到用户信息
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')
  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // 不在白名单的无Token无法进入
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
