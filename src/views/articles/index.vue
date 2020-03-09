<template>
  <el-card class="articles">
    <div slot="header" class="clearfix">
      <span>内容列表</span>
    </div>
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态">
        <el-radio-group v-model="searchForm.status">
          <!-- // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道选择 -->
      <el-form-item label="频道列表">
        <el-select v-model="searchForm.channel_id"  placeholder="请选择频道">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
             :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 日期选择 -->
      <!-- {{searchForm}} -->
      <el-form-item  label="事件选择">
        <el-date-picker v-model="searchForm.value1" type="daterange"></el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 文章的主体结构 flex布局  -->
    <el-row class="total" type="flex" align="middle">
      <span>共找到条符合条件的内容</span>
    </el-row>
    <!-- 列表内容 -->
    <!-- article-item 作为一个循环项 -->
    <div class="article-item" v-for="item in  list" :key="item.id.toString()">
      <!-- 左侧内容 -->
      <div class="left">
        <!-- 处理图片 -->
        <img :src="item.cover.images.length ? item.cover.images : defaultImg" alt />
        <div class="info">
          <span>{{item.title}}</span>
          <!-- 的需要判断 -->
          <el-tag :type=" item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span>
          <i class="el-icon-edit"></i> 修改
        </span>
        <span>
          <i class="el-icon-delete"></i> 删除
        </span>
      </div>
    </div>
  </el-card>
  <!-- 下边表的部分 -->
</template>

<script>
export default {
  data () {
    return {
      //  定义表单数据
      searchForm: {
        status: 5, // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        channel_id: null,
        value1: ''
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/default.gif')
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      // 根据当前状态的值 显示不同类型的tag标签
      switch (value) {
        case 0:
          return 'warning' // 草稿的时候 警告
        case 1:
          return 'info' // 待审核
        case 2 :
          return '' // 已发表
        case 3:
          return 'danger' // 失败 错误
      }
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // console.log(result)
        this.channels = result.data.channels
      })
    },
    // 获取文章
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    }
  },
  // 钩子函数
  created () {
    // 获取频道数据
    this.getChannels()
    this.getArticles() // 手动调用获取文章数据
  }
}
</script>

<style lang='less' scoped>
.articles {
  .total {
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  // 对文章循环项进行样式的编写
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        display: flex;
        flex-direction: column;
        height: 100px;
        justify-content: space-around;
        margin-left: 10px;
        .date {
          color: #999;
          font-size: 12px;
        }
        .tag {
          width: 60px;
          text-align: center;
        }
      }
    }
    .right {
      span {
        font-size: 12px;
        margin-right: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
