<template>
  <div class="com-page">
      <stock/>
  </div>
</template>

<script>
import Stock from 'components/echartComp/Stock'
export default {
  name: 'StockPage',
  components:{Stock},
  data() {
    return {}
  },
};
</script>

<style lang='less' scoped>
</style>