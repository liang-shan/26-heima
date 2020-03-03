<template>
  <div class="login">

     <el-card class="login-card">
            <img class="login-img" src="../../assets/img/logo_index.png" alt="">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
                <el-form-item prop="mobile">
                    <!-- 表单域 -->
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                     <!-- 验证码 -->
                    <el-input  v-model="loginForm.code" style="width:60%;float:left " placeholder="请输入验证码"></el-input>
                 <!-- 放置一个按钮 -->
                    <el-button style="float:right" plain>发送验证码</el-button>
                </el-form-item>
                <el-form-item prop="checked">
                 <!-- 是否同意被人家坑 -->
                    <el-checkbox  v-model="loginForm.checked" class="yuedu">我已阅读同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item>
                 <el-button @click="login" style="width:100%" type="primary">登录</el-button>
                </el-form-item>
             </el-form>
     </el-card>
  </div>
</template>

<script>
// 在这修改一下
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      loginRules: {
        // required 如果为true表示该字段必填
        mobile: [{ required: true, message: '您的手机号不能为空' }, {
          pattern: /^1[3-9]\d{9}$/, // 正则表达式
          message: '您的手机号格式不正确'
        }],
        code: [{ required: true, message: '您的验证码不能为空' }, {
          pattern: /^\d{6}$/, // 要求6个数字
          message: '验证码应该是6位数字'
        }],
        // 自定义校验  required不能校验true/false
        checked: [{
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前的要校验的字段的值
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // 我们认为 如果 value 为true 就表示 校验成功 如果value 为false就表示校验失败
            // new Error(错误信息) 就是我们提示的错误信息
            value ? callback() : callback(new Error('您必须同意我们的霸王条款'))
          }
        }]
      }

    }
  },
  methods: {
    login () {
      // validate是对表单进行校验成功就会执行then不成功就会执行catch
      this.$refs.loginForm.validate().then(() => {
        // 校验成功回调取登入接口
        this.$axios({
          url: '/authorizations',
          data: this.loginForm,
          method: 'post'
        }).then(result => {
          // 接口调取成功把钥匙存入自己的口袋中也就是存入本地
          console.log(result)
          window.localStorage.setItem('user-token', result.data.data.token)
          // 并且跳转到登入页面用到编程式路由
          this.$router.push('/home')
        }).catch(() => {
          this.$message.error('用户名或者密码错误')
        })
      })
    }

  }

}
</script>

<style lang="less" scoped>
.login{
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before{
        content:"123";
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url(../../assets/img/back.jpg);
        background-size: cover;
        filter: blur(3px);

    }
    .login-card{
        background-color: rgba(0, 0, 0, 0);
        // opacity: 0.5;
        z-index: 2;
        width:440px;
        height: 340px;

        .login-img{
            height: 40px
        }

    }
}
</style>
