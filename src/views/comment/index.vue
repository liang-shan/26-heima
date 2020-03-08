<template>
<el-card>
  <el-table :data="tableList" style="width: 100%"

    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-table-column
        prop="title"
        label="标题"
        width="500">
    </el-table-column>
    <el-table-column
       :formatter="formatterBool"
        prop="comment_status"
        label="评论状态"
       >
    </el-table-column>
    <el-table-column
        prop="total_comment_count"
        label="总评论数">
    </el-table-column>
    <el-table-column
        prop="fans_comment_count"
        label="粉子评论数">
    </el-table-column>
    <el-table-column
      width="150"
        prop="caozuo"
        label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button @click="kaiOrG(obj.row)" size="small" type="text">{{ obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
        </template>
    </el-table-column>
  </el-table>
    <!-- 添加一个分页的插件 -->
    <el-row style="height:80px" type='flex' align="middle" justify="center">
        <el-pagination
          background
         layout="prev, pager, next"

         :current-page="page.currentPage"
         :total="page.total"
         :page-size="page.pageSize"
         @current-change="changePage">

      </el-pagination>
    </el-row>

</el-card>
</template>

<script>
export default {
  data () {
    return {

      page: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      },
      tableList: [],
      loading: false
    }
  },
  methods: {
    // 监听页数改变,传给axios参数
    changePage (newPage) {
      // alert(newPage)
      this.page.currentPage = newPage
      this.getComment() // 获取评论
    },
    // 获取分页的数据,显示到页面上

    // 获取评论数据,并赋值给tableList
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.page.currentPage, // 查对应页码
          per_page: this.page.pageSize // 查10条

        }
        // query参数应该在哪个位置传 axios
        // params 传get参数也就是query参数
        // data   传body参数也就是请求体参数
      }).then(result => {
        //  将返回结果的中 数组 给list
        console.log(result)
        this.tableList = result.data.results
        this.page.total = result.data.total_count// 总数
        this.loading = false
      })
    },
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },

    kaiOrG (row) {
      const mess = row.comment_status ? '关闭' : '打开'

      // $confirm 也支持 promise 点击确定会进入到then 点击取消会进入到catch
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          // query参数
          params: {
            article_id: row.id // 要求参数的文章id
          },
          data: {
          //  body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
        //   成功了 提示个消息 然后 重新拉取数据4
          this.$message.success(`${mess}评论成功`)
          //  重新拉取数据
          this.getComment() // 调用重新拉取数据的方法
        }).catch(() => {
        //   表示失败了 会进入到catch
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    //   在钩子函数中 直接获取数据
    this.getComment()
  }
}
</script>

<style>

</style>
