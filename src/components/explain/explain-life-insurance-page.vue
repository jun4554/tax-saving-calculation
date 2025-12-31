<template>
  <v-text-field
    v-model="lifeInsurance"
    inputmode="numeric"
    label="生命保険料控除"
    suffix="円"
    clearable
    :rules="maxDeductionAmount"
    class="right-input ime-disabled"
    maxlength="6"
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
            <v-toolbar color="primary" dark><strong>生命保険料控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 260px;">
              <div class="explain">
                <p>民間の生命保険会社に支払った保険料の控除。</p>
                <p>控除区分は「一般生命保険料控除」「介護医療保険料控除」「個人年金保険料控除」の3つがあり（新制度の場合）、それぞれで最大40,000円が控除可能。</p>
                <p>つまり最大で120,000円が控除対象。</p>
              </div>
              <div class="text-right">
                <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1140.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（生命保険料控除）</a>
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
    name: 'explain-life-insurance-page',
    props: {
      _lifeInsurance: String
    },
    data () {
      return {
        lifeInsurance: this._lifeInsurance,
        dialog: "",
        maxDeductionAmount: [
          v => v == null || v.replace(/[\D,]/g, '') <= 120000 || "控除額は最大120,000万円まで",
        ]
      }
    },
    methods: {
      onFocus: function() {
        if (this.lifeInsurance != null && this.lifeInsurance.length > 0) {
          this.lifeInsurance = this.lifeInsurance.toString().replace(/,/g, '');
        }
      },
      onBlur: function() {
        if (this.lifeInsurance != null && this.lifeInsurance.length > 0) {
          this.lifeInsurance = Number(this.lifeInsurance.replace(/[\D,]/g, '')).toLocaleString();
        }
        this.setLifeInsurance();
      },
      onClear: function () {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        this.lifeInsurance = "";
        this.setLifeInsurance();
      },
      setLifeInsurance() {
        this.$emit('getLifeInsurance', this.lifeInsurance);
      }
    }
  }
</script>