<template>
  <div>
    <div class="card border-dark mb-3">
      <div class="card-header" style="text-align: left; display: inline-block">{{ renderData.Name }}</div>
      <div class="card-body text-dark" style="align-items: center">
        <h5 class="card-title" style="float: left" >
          {{ renderData.Nominal + ' ' }}
          {{ renderData.CharCode + ' '}}
          <button class="btn" @click="curReverse">
            <svg style="margin-top: -6px" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </button>
          {{ renderData.Value + ' ' + CurRUB.CharCode }}
        </h5>
        <p class="card-bid" :class="{'red' : renderCurBid < 0,
              'green': renderCurBid > 0}">
          <svg style="margin-top: -4px" v-if="renderCurBid > 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
          </svg>
          <svg style="margin-top: -4px" v-if="renderCurBid < 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
          </svg>
          {{ ' ' + renderCurBid.toFixed(4) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CardCurrency",
  props: ['cur'],
  data: () => ({
    log: [],
    CurRUB: {
      CharCode: "RUB",
      Nominal: 1,
      Name: "Российский рубль"
    },
    CurBid: null
  }),
  methods: {
    curReverse () {
      const result = this.renderData.Nominal / this.renderData.Value
      const resultPre = this.renderData.Nominal / this.renderData.Previous

      if (this.renderData.CharCode === 'RUB') {
        this.renderData.Nominal = this.cur.Nominal
        this.renderData.Previous = resultPre.toFixed(5) * this.cur.Nominal
        this.renderData.Name = this.cur.Name
        this.CurRUB.CharCode = ' RUB'
        this.renderData.CharCode = this.cur.CharCode
        this.renderData.Value = result.toFixed(5) * this.cur.Nominal
      }
      else {
        this.renderData.Nominal = 1
        this.renderData.Previous = resultPre.toFixed(5)  / this.renderData.Nominal
        this.renderData.Name = 'Российский рубль'
        this.CurRUB.CharCode = ' ' + this.cur.CharCode
        this.renderData.CharCode = 'RUB'
        this.renderData.Value = result.toFixed(5) / this.renderData.Nominal
      }
    }
  },
  computed: {
    renderData() {
      return this.log = JSON.parse(JSON.stringify(this.cur))
    },
    renderCurBid() {
      if (this.renderData.CharCode === 'RUB') {
        return this.CurBid = this.renderData.Previous - this.renderData.Value
      } else {
        return this.CurBid = this.cur.Previous - this.cur.Value
      }
    }
  }
}
</script>

<style scoped>
.card-bid {
  float: right;
  margin-top: 6px;
}
.green {
  color: yellowgreen;
}
.red {
  color: orangered;
}
</style>