<template>
  <v-form>
    <v-container>
      <div class="title grey--text text--darken-2">個人事業税の計算
        <v-dialog
          v-model="dialog"
          scrollable
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-n1"
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
              <v-toolbar color="primary" dark><strong>個人事業税</strong></v-toolbar>
              <v-divider></v-divider>
              <v-card-text style="height: 330px;">
                <div class="explain">
                  <p>個人事業主が支払う税金。<br>営んでいる業種によって税率が異なる。</p>
                  <p>基礎控除的な意味合いとして、一律290万円が控除される。そのため所得が290万円以下の場合は非課税。</p>
                  <p>なお、支払った個人事業税は経費として計上可能。</p>
                </div>
                <div class="text-right">
                  <p><a href="https://www.tax.metro.tokyo.lg.jp/kazei/kojin_ji.html" target="_blank" rel="noopener noreferrer">参考：東京都主税局</a></p>
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
      </div>

      <v-row/>
      <!-- 専従者給与 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <v-text-field
            v-model="salary"
            inputmode="numeric"
            label="専従者給与"
            suffix="円"
            clearable
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('salary')"
            @blur="onBlur('salary')"
            @click:clear="onClear('salary')"
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- 繰越控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <v-text-field
            v-model="transferred"
            inputmode="numeric"
            label="繰越給与"
            suffix="円"
            clearable
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('transferred')"
            @blur="onBlur('transferred')"
            @click:clear="onClear('transferred')"
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- 事業主控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <v-text-field
            v-model="businessOwnerDeduction"
            inputmode="numeric"
            label="事業主控除"
            suffix="円"
            clearable
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('businessOwnerDeduction')"
            @blur="onBlur('businessOwnerDeduction')"
            @click:clear="onClear('businessOwnerDeduction')"
            dense
          ></v-text-field>
          <div
            id="taxAmountLabel"
            class="caption text-right mt-n4"
          >※営業期間が1年未満の場合は月額割</div>
        </v-col>
      </v-row>

      <!-- 税率 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <span class="grey--text text--darken-2">税率</span>
          <v-radio-group
            v-model="businessTaxRate"
            row
            @change="onChange()"
          >
            <v-radio label="5%" value="0.05" />
            <v-radio label="4%" value="0.04" />
            <v-radio label="3%" value="0.03" />
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <v-text-field
            v-model="personalBusinessTax"
            label="個人事業税"
            filled
            readonly
            suffix="円"
            class="right-input"
            dense
          ></v-text-field>
        </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'pesonal-business-tax-page',
    props: {
      _totalIncome: Number,
      _salary: String,
      _transferred: String,
      _businessOwnerDeduction: String,
      _businessTaxRate: String
    },
    data () {
      return {
        salary: this._salary,
        transferred: this._transferred,
        businessOwnerDeduction: this._businessOwnerDeduction,
        businessTaxRate: this._businessTaxRate,
        personalBusinessTax: "",
        dialog: ""
      }
    },
    // ロード時のイベント
    mounted: function() {
      this.personalBusinessTaxCalc();
    },
    methods: {
      onFocus: function(e) {
        switch(e) {
          case 'salary':
            if (this.salary != null && this.salary.length > 0) {
              this.salary = this.salary.replace(/,/g, '');
            }
            break;
          case 'transferred':
            if (this.transferred != null && this.transferred.length > 0) {
              this.transferred = this.transferred.replace(/,/g, '');
            }
            break;
          case 'businessOwnerDeduction':
            if (this.businessOwnerDeduction != null && this.businessOwnerDeduction.length > 0) {
              this.businessOwnerDeduction = this.businessOwnerDeduction.replace(/,/g, '');
            }
            break;
        }
      },
      onBlur: function(e) {
        switch(e) {
          case 'salary':
            if (this.salary != null && this.salary.length > 0) {
              this.salary = this.salary.replace(/[\D,]/g, '');
            }
            break;
          case 'transferred':
            if (this.transferred != null && this.transferred.length > 0) {
              this.transferred = this.transferred.replace(/[\D,]/g, '');
            }
            break;
          case 'businessOwnerDeduction':
            if (this.businessOwnerDeduction != null && this.businessOwnerDeduction.length > 0) {
              this.businessOwnerDeduction = this.businessOwnerDeduction.replace(/[\D,]/g, '');
            }
            break;
        }
        this.personalBusinessTaxCalc();
      },
      onClear: function(e) {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        switch(e) {
          case 'salary':
            this.salary = "";
            break;
          case 'transferred':
            this.transferred = "";
            break;
          case 'businessOwnerDeduction':
            this.businessOwnerDeduction = "";
            break;
        }
        this.personalBusinessTaxCalc();
      },
      onChange: function () {
        this.personalBusinessTaxCalc();
      },
      // 個人事業税の計算
      personalBusinessTaxCalc() {

        if (this._totalIncome == null || this._totalIncome.length == 0) {
          this.afterPersonalBusinessTaxCalc();
          this.setCalcData(); 
          return;
        }
        
        var personalBusinessTax = this._totalIncome;
        
        // 専従者給与
        if (this.salary != null && this.salary.length > 0) {
          personalBusinessTax -= Number(this.salary.replace(/,/g, ''));
        }
        // 繰越控除
        if (this.transferred != null && this.transferred.length > 0) {
          personalBusinessTax -= Number(this.transferred.replace(/,/g, ''));
        }
        // 事業主控除
        if (this.businessOwnerDeduction != null && this.businessOwnerDeduction.length > 0) {
          personalBusinessTax -= Number(this.businessOwnerDeduction.replace(/,/g, ''));
        }
        // 税率
        personalBusinessTax = personalBusinessTax * Number(this.businessTaxRate);

        // 千円未満切り捨て
        personalBusinessTax = Math.floor(personalBusinessTax / 1000.0) * 1000.0;

        if (personalBusinessTax < 0) personalBusinessTax = 0;
        this.personalBusinessTax = personalBusinessTax.toLocaleString();

        this.afterPersonalBusinessTaxCalc();

        this.setCalcData();        
      },
      afterPersonalBusinessTaxCalc() {

        // 3桁区切りにする
        if (this.salary != null && this.salary.length > 0) {
          this.salary = Number(this.salary.replace(/,/g, '')).toLocaleString();
        }
        if (this.transferred != null && this.transferred.length > 0) {
          this.transferred = Number(this.transferred.replace(/,/g, '')).toLocaleString();
        }
        if (this.businessOwnerDeduction != null && this.businessOwnerDeduction.length > 0) {
          this.businessOwnerDeduction = Number(this.businessOwnerDeduction.replace(/,/g, '')).toLocaleString();
        }
      },
      setCalcData() {
        this.$emit('getPersonalBusinessTax', 
                [
                  this.salary,
                  this.transferred,
                  this.businessOwnerDeduction,
                  this.businessTaxRate
                ]
              );
      
      }
    }
  }
</script>

<style>
  .explain {
    margin-top: 20px;
  }
</style>
