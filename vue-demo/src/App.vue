<template>
  <div id="app">
    <Map/>
    <!-- <Bar/> -->
  </div>
</template>

<script>
import Map from './components/Map.vue'
// import Bar from './components/Bar.vue'

export default {
  name: 'app',
  components: {
    Map,
    // Bar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
