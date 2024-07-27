<template>
  <HelloWorld/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
*{margin:0; padding:0;}
@font-face {
  font-family: 'MyCustomFont';
  src: url('./assets/font/微软雅黑-win10 粗体.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#app {
  
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* font-family: 'Microsoft YaHei', 'Arial', sans-serif; */
  font-family: 'MyCustomFont', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  min-height: 100vh;
  background-color:#0e1a26;
}
</style>
