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
  font-family: 'Bahnschrift';
  src: url('./assets/font/Bahnschrift.woff2.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#app {
  
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* font-family: 'Microsoft Heiti', 'Arial', sans-serif; */
  font-family: "黑体", "Heiti SC", "Heiti TC", sans-serif;
  /* font-family: 'MyCustomFont', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 25px;
  width: 100vw;
  min-height: 120vh;
  background-color:#0f1825;
}
</style>
