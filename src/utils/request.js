// 专门处理axios
/* 对axios进行第二次封装,配置基地址,拦截器及其他

*/
import axios from 'axios'
import router from '@/router'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
// 匹配拦截器 看看有没有token有执行成功,没有执行失败

// 处理大数据的问题
axios.defaults.transformResponse = [function (data) {
  // 这里主要处理 id 超过 大数字的时候  转化 不正确的问题  JSONBig.parse是第三方的包 内部怎么实现的,我们不需要关心
  // 只需要知道它可以帮助我们 转化正确
  // const result = JSON.parse(data)
  // return result
  // 用json-bigint的转化来做
  // 这里需要判断一下 data 是不是为空 如果为空就不能转化了
  return data ? JSONBig.parse(data) : {}
}]

axios.interceptors.request.use(function (config) {
//   console.log(config)
  const token = localStorage.getItem('user-token') // 从兜里拿钥匙 也就是从缓存中取token
  config.headers.Authorization = `Bearer ${token}`

  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
  // console.log(response)

  // 回调函数第一个参数 是响应体
  // 在拦截器中 需要将数据返回  将数据进行解构
  return response.data ? response.data : {} // 有的接口 没有任何的响应数据
  // 成功的时候执行
}, function (error) {
  // 失败的时候执行
  // 返回报401说明钥匙问题,这里有一个粗暴的解决办法,就是删除token  重新回到login去拿钥匙
  if (error.response.status === 401) {
    localStorage.removeItem('user-token') // 删除钥匙
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
