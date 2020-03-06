<template>
 <!-- 大的容器 -->
<el-container>
  <el-aside width="200px">
     <ceb></ceb>
  </el-aside>
  <el-container>
    <el-header style="padding:0">
    <toubu></toubu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>

</script>

<style>

</style>
