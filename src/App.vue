<template>
  <div id="app">

      <router-link to="/login"></router-link>
      <!-- <router-link to="/about">About</router-link> -->

    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color: #f2f3f5
}

</style>
