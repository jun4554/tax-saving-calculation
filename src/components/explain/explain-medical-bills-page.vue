<template>
  <v-text-field
    v-model="medicalBills"
    inputmode="numeric"
    label="医療費控除"
    suffix="円"
    clearable
    :rules="maxDeductionAmount"
    class="right-input ime-disabled"
    maxlength="7"
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
            <v-toolbar color="primary" dark><strong>医療費控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 350px;">
              <div class="explain">
                <p>本人や配偶者または扶養親族が支払った医療費において、その医療費が10万円を超えた場合、超えた分の金額の控除が受けられる（最高200万円）。</p>
                <p>ただし、社会保険や生命保険などで支給された金額は差し引いて計算しなければいけない。</p>
                <p>電車やバスなどの公共交通機関の交通費は対象となるが、その他（タクシーなど）の交通機関や自家用車のガソリン代は原則対象にならない。</p>
              </div>
              <div class="text-right">
                <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1120.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（医療費控除）</a>
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
    name: 'explain-medical-bills-page',
    props: {
      _medicalBills: String
    },
    data () {
      return {
        medicalBills: this._medicalBills,
        dialog: "",
        maxDeductionAmount: [
          v => v == null || v.replace(/[\D,]/g, '') <= 2000000 || "控除額は最大2,000,000万円まで",
        ]
      }
    },
    methods: {
      onFocus: function() {
        if (this.medicalBills != null && this.medicalBills.length > 0) {
          this.medicalBills = this.medicalBills.toString().replace(/,/g, '');
        }
      },
      onBlur: function() {
        if (this.medicalBills != null && this.medicalBills.length > 0) {
          this.medicalBills = Number(this.medicalBills.replace(/[\D,]/g, '')).toLocaleString();
        }
        this.setMedicalBills();
      },
      onClear: function () {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        this.medicalBills = "";
        this.setMedicalBills();
      },
      setMedicalBills() {
        this.$emit('getMedicalBills', this.medicalBills);
      }
    }
  }
</script>