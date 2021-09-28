<template>
  <div class="home">
    <Navbar />
    <SearchInput />
    <CardCurrency
        v-for="cur in renderCurrenciesData"
        :key="cur.id"
        :cur="cur"
    />
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

import Navbar from "../components/Navbar.vue";
import CardCurrency from "../components/CardCurrency";
import SearchInput from "../components/SearchInput";

export default {
  name: 'List',
  data: () => ({
    sortCurrencies: [],
  }),
  async mounted() {
    await this.$store.dispatch('fetchCurrency')
  },
  computed: {
    ...mapGetters(['searchValue']),
    ...mapState(['currenciesData']),
    renderCurrenciesData() {
      if (!this.searchValue) {
        return Object.values(this.currenciesData)
      } else {
        return Object.values(this.currenciesData).filter(i => {
          return i.CharCode.toLocaleLowerCase().includes(this.searchValue.toLowerCase())
        })
      }
    }
  },
  components: {
    SearchInput,
    CardCurrency,
    Navbar
  }
}
</script>

