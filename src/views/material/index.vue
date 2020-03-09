<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>素材管理</span>
    </div>
    <div class="text item">
      <!-- 全部收藏切换 -->
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <span @click=" tanone ">
          <el-radio-button :label="true" >全部</el-radio-button>
        </span>
        <span @click=" tanone " ><el-radio-button :label="false" >收藏</el-radio-button></span>
      </el-radio-group>
      <el-row style="float: right; ">
        <el-button type="primary">上传图片</el-button>
      </el-row>
    </div>
    <!-- 全部的素材 -->
    <div class="text item" style="display: flex;  justify-content: flex-start;flex-wrap: wrap;">
      <div class="kaung" v-for="(item,index) in list" :key="index">
        <img :src="item.url" alt />
        <el-button type="warning" icon="el-icon-star-off" size="small" circle></el-button>
        <el-button type="info" icon="el-icon-delete" size="small" circle></el-button>
      </div>
    </div>
    <!-- 收藏的素材-->
    <div class="text item" style="display: flex;  justify-content: flex-start;flex-wrap: wrap;">
      <div class="kaung" v-for="(item,index) in list" :key="index">
        <img :src="item.url" alt />
        <el-button type="warning" icon="el-icon-star-off" size="small" circle></el-button>
        <el-button type="info" icon="el-icon-delete" size="small" circle></el-button>
      </div>
    </div>
    <!-- 下边的页码区域 -->
    <div class="text item">
      <el-row style="height:80px" type="flex" align="middle" justify="center">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </el-row>
    </div>
    <!-- 试试 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 收藏和全部切换
      isCollapse: true,

      list: []
    }
  },
  methods: {
    tanone () {
      alert(this.isCollapse)
    },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    //   alert(1)
    // },

    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false // 获取全部数据
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results // 装的图片素材
      })
    }
  },
  created () {
    // 实例化之后 调用获取素材数据
    this.getMaterial() // 获取素材数据
  }
}
</script>

<style lang="less" scoped>
.kaung {
  width: 150px;
  height: 150px;
  background-color: #f4f5f6;
  border-radius: 10px;
  margin: 30px;
  // flex-direction：row

  img {
    display: inline-block;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 100px;
    margin-bottom: 12px;
  }
  .el-button + .el-button {
    margin-left: 85px;
  }
}
</style>
