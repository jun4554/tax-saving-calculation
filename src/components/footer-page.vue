<template>
  <v-footer id="vFooter" outlined max-height="150">
    <v-layout justify-center>
      <v-form>
        <v-container>
          <v-row dense>
            <v-col cols="12" xs="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model.number="totalIncome"
                v-show="false"
              ></v-text-field>
              <v-text-field
                v-model.number="deduction"
                v-show="false"
              ></v-text-field>
              <v-text-field
                v-model.number="taxableIncome"
                label="課税所得"
                filled
                readonly
                suffix="円"
                dense
                class="right-input my-n2"
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model.number="taxAmount"
                label="所得税額"
                filled
                readonly
                suffix="円"
                dense
                class="right-input my-n2"
              ></v-text-field>
              <div class="caption text-right mt-n6">※復興特別所得税含む</div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    name: 'footer-page',
    props: {
      array: Array
    },
    data () {
      return {
        taxableIncome: "",
        taxAmount: ""
      }
    },
    updated: function() {
       this.taxableIncomeCalc();
    },
    methods: {
      // 課税所得の計算
      taxableIncomeCalc() {

        if (this.totalIncome == null) {
          this.taxableIncome = "";
          this.taxAmount = "";
          return;
        }

        var deduction = this.deduction + this.array[2]; // this.array[2]はbasic

        var taxableIncome = 0;
        taxableIncome = Math.floor((this.totalIncome - deduction) / 1000.0) * 1000.0; // 千円未満切り捨て

        if (taxableIncome < 0) taxableIncome = 0;

        // 3桁区切りにする
        this.taxableIncome = taxableIncome.toLocaleString();

        this.taxAmountCalc(taxableIncome);
      },
      // 所得税額の計算
      taxAmountCalc(taxableIncome) {
       
        var taxAmount = 0;

        switch(true) {
          case taxableIncome <= 1950000:  // 195万以下
            taxAmount = taxableIncome * 0.05
            break;
          case 1950000 < taxableIncome  && taxableIncome <= 3300000: // 195万超330万以下
            taxAmount = taxableIncome * 0.1 - 97500
            break;
          case 3300000 < taxableIncome  && taxableIncome <= 6950000: // 330万超695万以下
            taxAmount = taxableIncome * 0.2 - 427500
            break;
          case 6950000 < taxableIncome  && taxableIncome <= 9000000: // 695万超900万以下
            taxAmount = taxableIncome * 0.23 - 636000
            break;
          case 9000000 < taxableIncome  && taxableIncome <= 18000000: // 900万超1800万以下
            taxAmount = taxableIncome * 0.33 - 1536000
            break;
          case 18000000 < taxableIncome  && taxableIncome <= 40000000: // 1800万超4000万以下
            taxAmount = taxableIncome * 0.4 - 2796000
            break;
          default: // 4000万超
            taxAmount = taxableIncome * 0.45 - 4796000
        }

        // 復興特別所得税（小数点以下切り捨て）
        taxAmount += Math.floor(taxAmount * 0.021)

        // 100円未満切り捨て
        taxAmount = Math.floor(taxAmount / 100.0) * 100.0;

        // 3桁区切りにする
        this.taxAmount = taxAmount.toLocaleString();
      }
    },
    // propsに渡された親コンポーネントデータをこのコンポーネントに渡す
    computed: {
      totalIncome: {
        get() {
          return this.array[0]; // totalIncome
        }
      },
      deduction: {
        get() {
          return this.array[1]; // deduction
        }
      }
    }
  }
</script>

<style scoped>
  #vFooter {
    border-width: 3px;
    border-color: #4caf50 #FFFFFF #FFFFFF #FFFFFF;
  }
</style>
