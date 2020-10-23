<template>
  <div class="screen-header">
    <div>
      <img :src="headerSrc" alt="" />
    </div>
    <span class="logo">
      <!-- <img :src="logoSrc" alt="" /> -->
    </span>
    <span class="title">电商平台实时监控系统</span>
    <div class="title-right">
      <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme" />
      <span class="datetime">2049-01-01 00:00:00</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getThemeValue } from 'common/theme_utils'
export default {
  name: "",
  computed: {
    ...mapState(['theme']),
    logoSrc () {
      return '/static/img/'+ getThemeValue(this.theme).logoSrc
    },
    headerSrc () {
      return '/static/img/'+ getThemeValue(this.theme).headerBorderSrc
    },
    themeSrc () {
      return '/static/img/'+ getThemeValue(this.theme).themeSrc
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChangeTheme() {
      this.$emit('themeChange')
    },
  },
};
</script>

<style lang="less" scoped>
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
      img {
        width: 100%;
      }
    }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position:absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
</style>