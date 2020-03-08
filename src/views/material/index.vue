<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>素材管理</span>
    </div>
    <div class="text item">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-row style="float: right; ">
        <el-button type="primary">主要按钮</el-button>
      </el-row>
    </div>
    <div
      class="text item"
      style="display: flex;  justify-content: flex-start;
            flex-wrap: wrap;"
    >
      <div class="kaung" v-for="(item,index) in 11" :key="index">
        <img
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3118956596,1809570833&fm=26&gp=0.jpg"
          alt
        />
        <el-button type="warning" icon="el-icon-star-off" size="small" circle></el-button>
        <el-button type="info" icon="el-icon-delete" size="small" circle></el-button>
      </div>
    </div>
    <!-- 下边的页码区域 -->
    <div class="text item">
      <el-row style="height:80px" type='flex' align="middle" justify="center">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
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
    margin-bottom: 12px;
  }
  .el-button + .el-button {
    margin-left: 85px;
  }
}
</style>
