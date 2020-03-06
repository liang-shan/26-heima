<template>
  <el-row align="middle" type='flex' class='layout-header'>
    <!-- 左侧 -->
    <el-col class='left' :span="12">
       <!-- 图标 -->
       <i class='el-icon-s-fold'></i>
       <span>
           江苏传智播客教育科技股份有限公司
       </span>
    </el-col>
    <!-- 右侧 -->
    <el-col class='right' :span="12">
      <!-- 输入框 -->
        <el-input
        class="right-input"
           placeholder="请输入要搜索的内容"
           prefix-icon="el-icon-search"
           >
         </el-input>
         <!-- 图片 -->
         <span class="right-span">消息</span>
         <div class="right-img">

           <img :src="userInfor.photo" alt="">
         </div>
         <el-dropdown @command="handleCommand" style="float: right;cursor:pointer">
             <span class="el-dropdown-link">
                {{userInfor.name}}<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人信息</el-dropdown-item>
              <el-dropdown-item command="b">git地址</el-dropdown-item>
              <el-dropdown-item command="e" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

    </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfor: {}
    }
  },

  methods: {
    handleCommand (command) {
      if (command === 'a') {
        alert('点击了个人信息')
      } else if (command === 'b') {
        // 去往一个gei地址
        window.location.href = 'https://github.com/shuiruohanyu/94-heimatoutiaopc'
      } else if (command === 'e') {
        // alert(1)
        // 1.删除token 2.回到登入页面
        window.localStorage.removeItem('user-token')
        // 用编程式导航
        this.$router.push('/login')
      }
    }

  },
  created () {
    // 发axios请求先把钥匙拿出来

    // console.log(token)

    // 发axios请求
    this.$axios({
      url: '/user/profile'
      // method: 'GET'

    }).then(result => {
      console.log(result)
      this.userInfor = result.data
    })
  }

}
</script>

<style lang="less" scoped>
.layout-header{
  position: relative;
  background-color: #fff;
  height: 60px;
  .right-input{
    position: absolute;
    right: 170px;
    top:10px;
    z-index: 2;
    width: 170px;
    height: 33px;
    font-size: 10px
  }

  .right-img{
    position: absolute;
    right: 79px;
    top:8px;
    width: 44px;
    height: 44px;

    img{
      width: 100%;
      height: 100%;
      border-radius:22px;
    }

  }
   .right-span{
     display: block;
     position: absolute;
     right:128px;
     top:20px

        }

}

</style>
