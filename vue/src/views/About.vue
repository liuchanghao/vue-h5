<template>
  <div class="about">
  <h1>Welcome to About</h1>
  <h2>当前商户:  {{ merchantInfo.partnerName }}</h2>
  <!-- <img src="../images/a.jpg" /> -->
  </div>
</template>

<script>
// import { getMerchantInfoByAppid } from '@/api/merchant';
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  name: 'About',
  data() {
    return {
    }
  },
  async mounted() {
    const result1 = await this.$store.dispatch('user/getUserByKey', { userId: '10000008' });
    console.log('---19---', result);
  },
  computed: {
      ...mapGetters([
        'merchantInfo'
      ])
  },
  methods: {
  },
}
</script>
