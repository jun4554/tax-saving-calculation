<template>
  <v-text-field
    v-model="earthquakeInsurance"
    inputmode="numeric"
    label="地震保険料控除"
    suffix="円"
    clearable
    :rules="maxDeductionAmount"
    class="right-input ime-disabled"
    maxlength="5"
    @focus="onFocus()"
    @blur="onBlur"
    @click:clear="onClear()"
    dense
  >
    <template v-slot:append-outer>
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mt-n2"
            fab
            dark
            small
            color="primary"
            outlined
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-help-circle-outline
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark><strong>地震保険料控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 180px;">
              <div class="explain">
                <p>損害保険契約の地震等損害部分に支払った保険料の控除。</p>
                <p>収めた金額は最大50,000円までが控除対象。</p>
              </div>
              <div class="text-right">
                <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1145.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（地震保険料控除）</a>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary dark"
                text
                @click="dialog.value = false"
              >
              閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-text-field>
</template>

<script>
  export default {
    name: 'explain-earthquake-insurance-page',
    props: {
      _earthquakeInsurance: String
    },
    data () {
      return {
        earthquakeInsurance: this._earthquakeInsurance,
        dialog: "",
        maxDeductionAmount: [
          v => v == null || v.replace(/[\D,]/g, '') <= 50000 || "控除額は最大50,000万円まで",
        ]
      }
    },
    methods: {
      onFocus: function() {
        if (this.earthquakeInsurance != null && this.earthquakeInsurance.length > 0) {
          this.earthquakeInsurance = this.earthquakeInsurance.toString().replace(/,/g, '');
        }
      },
      onBlur: function() {
        if (this.earthquakeInsurance != null && this.earthquakeInsurance.length > 0) {
          this.earthquakeInsurance = Number(this.earthquakeInsurance.replace(/[\D,]/g, '')).toLocaleString();
        }
        this.setEarthquakeInsurance();
      },
      onClear: function () {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        this.earthquakeInsurance = "";
        this.setEarthquakeInsurance();
      },
      setEarthquakeInsurance() {
        this.$emit('getEarthquakeInsurance', this.earthquakeInsurance);
      }
    }
  }
</script>