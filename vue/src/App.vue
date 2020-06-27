<template>
  <div id="app">
    <router-view/>
    <van-tabbar route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item replace :to="{name:'Home',query:{appid: this.appid}}" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace :to="{name:'About',query:{appid: this.appid}}" icon="search">
        关于
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  name: 'App',
  data() {
    return {
      appid: null,
    }
  },
  async created() {
    console.log('--App---created---');
    document.body.removeChild(document.getElementById('Loading'));//加载页面完后移除加载动画
    this.appid = this.$getUrlParam('appid');//获取url上的appid参数值
  },
  async mounted() {
    console.log('--App---mounted---');
    //微信jssdk配置
    await this.$wechatConfig();
    //测试自定义分享内容
    // await this.$wechatCustomShare({
    //   title: '测试分享好友标题',
    //   desc: '测试分享描述',
    //   link: 'http://lch.ngrok.xinyebang.cn',
    //   imgUrl: 'https://pixiugj.oss-cn-hangzhou.aliyuncs.com/mp_pixiugj/uploads/1504848808346.png',
    // });
    await this.$store.dispatch('merchant/getMerchantInfoByAppid', { appid: this.appid });
  }
}
</script>
