<template>
  <div class="com-page">
      <seller/>
  </div>
</template>

<script>
import Seller from './Seller'
export default {
  name: 'SellerPage',
  components:{Seller},
  data() {
    return {
      msg: 'xx',
    }
  },
};
</script>

<style lang='less' scoped>
</style>