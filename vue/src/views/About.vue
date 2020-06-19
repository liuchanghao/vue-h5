<template>
  <div class="about">
  <h1>Welcome to About</h1>
  <h2>当前商户:  {{ merchantInfo.partnerName }}</h2>
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
