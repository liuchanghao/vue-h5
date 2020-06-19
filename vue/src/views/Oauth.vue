<template>
  <div class="about">
  <h1>Welcome to Oauth</h1>
  </div>
</template>

<script>
export default {
  name: 'Oauth',
  data() {
    return {
        code: null,
    }
  },
  async mounted() {
    this.code =  this.$route.query.code; //微信授权code
    //获取微信用户信息
    const wechatInfo = await this.$store.dispatch('wechat/getWechatMemberInfo', {code: this.code});
    //本地缓存微信用户信息
    await this.$setSessionStorage('WECHAT_MEMBER_INFO', wechatInfo);
    const beforeLoginUrl = await this.$getSessionStorage('BEFORE_LOGIN_URL') || null;
    console.log('---beforeLoginUrl---', beforeLoginUrl);
    if(beforeLoginUrl) {
        this.$router.replace(beforeLoginUrl);
    } else {
        console.log('系统繁忙，请稍后再试~');
    }
  },
  methods: {
  },
}
</script>
