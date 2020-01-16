<template>
<div>
  我的主页面  
  <menuBar :active-index="3"></menuBar>
</div>
</template>

<script>import menuBar from '../common/menuBar'
export default {
  components:{
    menuBar
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
