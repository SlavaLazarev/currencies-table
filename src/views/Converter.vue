<template>
  <div class="about">
    <Navbar/>

      <div class="card border-dark mb-3" style="display: inline-block; margin-right: 20px">
        <div class="card-header" style="text-align: left">{{ currencyOne.Name }}</div>
        <div class="card-body text-dark" style="text-align: left; display: inline-block">
          <div style="display: inline-block">
          <select class="form-select" style="float: left" v-model="currencyOne">
            <option :value="currencyOne">{{ currencyOne.CharCode }}</option>
            <option
                v-for="cur in renderCurrenciesData"
                :key="cur.id"
                :value="cur"
            >
              {{cur.CharCode}}
            </option>
          </select>
          <input class="form-control" style="float: right" v-model="currencyOne.Nominal">
            </div>
        </div>
      </div>

      <div style="max-width: 15rem; display: inline-block; margin-right: 20px">
        <button class="btn" @click="cardReverse">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
          </svg>
        </button>
      </div>

    <div class="card border-dark mb-3" style="display: inline-block; margin-right: 20px">
      <div class="card-header" style="text-align: left">{{ currencyTwo.Name }}</div>
      <div class="card-body text-dark" style="text-align: left; display: inline-block">
        <div style="display: inline-block">
          <select class="form-select" style="float: left" v-model="currencyTwo">
            <option :value="currencyTwo">{{ currencyTwo.CharCode }}</option>
            <option
                v-for="cur in renderCurrenciesData"
                :key="cur.id"
                :value="cur"
            >
              {{cur.CharCode}}
            </option>
          </select>
          <input class="form-control" disabled type ="text" style="float: right" v-model="this.converterCurrency.toFixed(2)">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import {mapState} from "vuex";

export default {
  name: "Converter",
  data: () => ({
    currencyValue: null,
    currencyOne: {
      CharCode: "Please select",
      Nominal: 0,
      Value: 0,
      Name: "Please select currency",
    },
    currencyTwo: {
      CharCode: "Please select",
      Nominal: 0,
      Value: 0,
      Name: "Please select currency",
    }
  }),
  async mounted() {
    await this.$store.dispatch('fetchCurrency')
  },
  computed: {
    ...mapState(['currenciesData']),
    renderCurrenciesData() {
      return  Object.values(this.currenciesData)
    },
    converterCurrency() {
      if (this.currencyTwo.CharCode === 'Please select') {
        return 0
      } else {
        return this.currencyValue = (this.currencyOne.Nominal) * (this.currencyOne.Value / this.currencyTwo.Value)
      }
    }
  },
  methods: {
    cardReverse() {
      const repository = JSON.parse(JSON.stringify(this.currencyOne))
      this.currencyOne = JSON.parse(JSON.stringify(this.currencyTwo))
      this.currencyTwo =  repository
    }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped>
input {
  width: 40%;
}
</style>