// 专门处理限权问题,导航守卫,当路由发生变化的时候,
// 会有一些函数触发, 这些函数我们可以选择放过拦截/放过/和跳转
// 在点击登入的时候
// 监测路由的变化,得引入路由
import router from '@/router'

// router.beforeEach(function (to, from, next) {
//   // next() // 表示放过
//   // next("新地址")去往一个新的地方,
//   // next(false)表示拦截一个地址
//   // to你要到哪里去 一个具体的路由地址
//   // from 来自哪里一个具体的路由地址
//   // 判断一下要去的地址"home"
//   const token = window.localStorage.getItem('user-token')
//   if (to.path.startsWith('/home')) {
//     //   看看有钥匙没,有放过,没有回到login
//     if (token) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     // 我不是去homed的直接放过
//     next()
//   }
// })
// ------------------------------老师代码

router.beforeEach(function (to, from, next) {
  //   next() // 表示放过
  // 首先应该判断 你需要拦截哪些页面 如果页面的地址以 /home为开头, 就需要进行token的判断
  // 判断你要去的页面是不是以 /home为开头
  if (to.path.startsWith('/home')) {
    //   表示你要去主页相关的页面 我要看看你有没有钥匙 你没有钥匙我把你一脚踢回 登录页
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 放过
    } else {
      next('/login') // 回登录页 去拿钥匙
    }
  } else {
    //   如果我不是去主页相关
    next() // 直接放过
  }
})
