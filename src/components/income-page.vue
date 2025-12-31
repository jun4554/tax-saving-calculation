<template>
  <v-form>
    <v-container>
      <v-row/>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="declarationDeduction"
            item-text="label"
            item-value="value"
            :items="items"
            label="申告控除選択"
            outlined
            @change="onChange"
          ></v-select>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <h3>事業所得</h3>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <!-- type="number"をonFocus時に入れる？ -->
          <v-text-field
            v-model="businessRevenue"
            inputmode="numeric"
            label="収入"
            suffix="円"
            clearable
            :rules="this.required('businessRevenue')"
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('businessRevenue')"
            @blur="onBlur('businessRevenue')"
            @click:clear="onClear('businessRevenue')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <!-- type="number"をonFocus時に入れる？ -->
          <v-text-field
            v-model="businessCost"
            inputmode="numeric"
            label="経費"
            suffix="円"
            clearable
            :rules="this.required('businessCost')"
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('businessCost')"
            @blur="onBlur('businessCost')"
            @click:clear="onClear('businessCost')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <v-text-field
            v-model.number="businessIncome"
            label="事業所得"
            suffix="円"
            readonly
            rounded
            background-color="#f5f5f5"
            class="right-input"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <h3>不動産所得</h3>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <!-- type="number"をonFocus時に入れる？ -->
          <v-text-field
            v-model="realEstateRevenue"
            inputmode="numeric"
            label="収入"
            suffix="円"
            clearable
            :rules="this.required('realEstateRevenue')"
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('realEstateRevenue')"
            @blur="onBlur('realEstateRevenue')"
            @click:clear="onClear('realEstateRevenue')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <!-- type="number"をonFocus時に入れる？ -->
          <v-text-field
            v-model="realEstateCost"
            inputmode="numeric"
            label="経費"
            suffix="円"
            clearable
            :rules="this.required('realEstateCost')"
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('realEstateCost')"
            @blur="onBlur('realEstateCost')"
            @click:clear="onClear('realEstateCost')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <v-text-field
            v-model.number="realEstateIncome"
            label="不動産所得"
            suffix="円"
            readonly
            rounded
            background-color="#f5f5f5"
            class="right-input"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <h3>雑所得</h3>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <!-- type="number"をonFocus時に入れる？ -->
          <v-text-field
            v-model="miscellaneousRevenue"
            inputmode="numeric"
            label="収入"
            suffix="円"
            clearable
            :rules="this.required('miscellaneousRevenue')"
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('miscellaneousRevenue')"
            @blur="onBlur('miscellaneousRevenue')"
            @click:clear="onClear('miscellaneousRevenue')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <!-- type="number"をonFocus時に入れる？ -->
          <v-text-field
            v-model="miscellaneousCost"
            inputmode="numeric"
            label="損失"
            suffix="円"
            clearable
            :rules="this.required('miscellaneousCost')"
            class="right-input ime-disabled"
            maxlength="12"
            @focus="onFocus('miscellaneousCost')"
            @blur="onBlur('miscellaneousCost')"
            @click:clear="onClear('miscellaneousCost')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <v-text-field
            v-model.number="miscellaneousIncome"
            label="雑所得"
            suffix="円"
            readonly
            rounded
            background-color="#f5f5f5"
            class="right-input"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

  // 特別控除列挙型
  var SpecialDeducationValue = {
    aoiro65: 650000, 
    aoiro55: 550000, 
    shiroiro10: 100000
  }

  // 基礎控除列挙型
  var BasicDeducationValue = {
    basic48: 480000, 
    basic32: 320000, 
    basic16: 160000,
    basic0: 0
  }

  export default {
    name: 'income-page',
    props: {
      _declarationDeduction: Number,
      _businessRevenue: String,
      _businessCost: String,
      _realEstateRevenue: String,
      _realEstateCost: String,
      _miscellaneousRevenue: String,
      _miscellaneousCost: String
    },
    data() {
      return {
        items: [
          {label: '青色申告65万円控除', value: SpecialDeducationValue.aoiro65},
          {label: '青色申告55万円控除', value: SpecialDeducationValue.aoiro55},
          {label: '青色・白色申告10万円控除', value: SpecialDeducationValue.shiroiro10}
        ],
        declarationDeduction: this._declarationDeduction == 0 ? SpecialDeducationValue.aoiro65 : this._declarationDeduction,
        businessRevenue: this._businessRevenue,
        businessCost: this._businessCost,
        realEstateRevenue: this._realEstateRevenue,
        realEstateCost: this._realEstateCost,
        miscellaneousRevenue: this._miscellaneousRevenue,
        miscellaneousCost: this._miscellaneousCost,
        businessIncome: "",
        realEstateIncome: "",
        miscellaneousIncome: "",
        basic: 0
      }
    },
    // ロード時のイベント
    mounted: function() {
      this.incomeCalc();
    },
    methods: {
      onChange: function() {
        this.incomeCalc();
      },
      onFocus: function(e) {

        switch(e) {
          case 'businessRevenue':
            if (this.businessRevenue != null && this.businessRevenue.length > 0) {
              this.businessRevenue = this.businessRevenue.toString().replace(/,/g, '');
            }
            break;
          case 'businessCost':
            if (this.businessCost != null && this.businessCost.length > 0) {
              this.businessCost = this.businessCost.toString().replace(/,/g, '');
            }
            break;
          case 'realEstateRevenue':
            if (this.realEstateRevenue != null && this.realEstateRevenue.length > 0) {
              this.realEstateRevenue = this.realEstateRevenue.toString().replace(/,/g, '');
            }
            break;
          case 'realEstateCost':
            if (this.realEstateCost != null && this.realEstateCost.length > 0) {
              this.realEstateCost = this.realEstateCost.toString().replace(/,/g, '');
            }
            break;
          case 'miscellaneousRevenue':
            if (this.miscellaneousRevenue != null && this.miscellaneousRevenue.length > 0) {
              this.miscellaneousRevenue = this.miscellaneousRevenue.toString().replace(/,/g, '');
            }
            break;
          case 'miscellaneousCost':
            if (this.miscellaneousCost != null && this.miscellaneousCost.length > 0) {
              this.miscellaneousCost = this.miscellaneousCost.toString().replace(/,/g, '');
            }
            break;
        }
      },
      onBlur: function(e) {

        switch(e) {
          case 'businessRevenue':
            if (this.businessRevenue != null && this.businessRevenue.length > 0) {
              this.businessRevenue = this.businessRevenue.replace(/[\D,]/g, '');
            }
            break;
          case 'businessCost':
            if (this.businessCost != null && this.businessCost.length > 0) {
              this.businessCost = this.businessCost.replace(/[\D,]/g, '');
            }
            break;
          case 'realEstateRevenue':
            if (this.realEstateRevenue != null && this.realEstateRevenue.length > 0) {
              this.realEstateRevenue = this.realEstateRevenue.replace(/[\D,]/g, '');
            }
            break;
          case 'realEstateCost':
            if (this.realEstateCost != null && this.realEstateCost.length > 0) {
              this.realEstateCost = this.realEstateCost.replace(/[\D,]/g, '');
            }
            break;
          case 'miscellaneousRevenue':
            if (this.miscellaneousRevenue != null && this.miscellaneousRevenue.length > 0) {
              this.miscellaneousRevenue = this.miscellaneousRevenue.replace(/[\D,]/g, '');
            }
            break;
          case 'miscellaneousCost':
            if (this.miscellaneousCost != null && this.miscellaneousCost.length > 0) {
              this.miscellaneousCost = this.miscellaneousCost.replace(/[\D,]/g, '');
            }
            break;
        }
        this.incomeCalc();
      },
      onClear: function(e) {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        switch(e) {
          case 'businessRevenue':
            this.businessRevenue = "";
            break;
          case 'businessCost':
            this.businessCost = "";
            break;
          case 'realEstateRevenue':
            this.realEstateRevenue = "";
            break;
          case 'realEstateCost':
            this.realEstateCost = "";
            break;
          case 'miscellaneousRevenue':
            this.miscellaneousRevenue = "";
            break;
          case 'miscellaneousCost':
            this.miscellaneousCost = "";
            break;
        }
        this.incomeCalc();
      },
      required: function(e) {
        var res = [];
        switch (e) {
          case 'businessRevenue':
            if(this.businessRevenue == null  && this.businessCost != null && this.businessCost.length > 0) {
              res.push('事業経費を入力している場合は必須です');
              return res;
            }
            break;
          case 'businessCost':
            if(this.businessCost == null  && this.businessRevenue != null && this.businessRevenue.length > 0) {
              res.push('事業収入を入力している場合は必須です');
              return res;
            }
            break;
          case 'realEstateRevenue':
            if(this.realEstateRevenue == null  && this.realEstateCost != null && this.realEstateCost.length > 0) {
              res.push('不動産経費を入力している場合は必須です');
              return res;
            }
            break;
          case 'realEstateCost':
            if(this.realEstateCost == null  && this.realEstateRevenue != null && this.realEstateRevenue.length > 0) {
              res.push('不動産収入を入力している場合は必須です');
              return res;
            }
            break;
          case 'miscellaneousRevenue':
            if(this.miscellaneousRevenue == null  && this.miscellaneousCost != null && this.miscellaneousCost.length > 0) {
              res.push('雑損失を入力している場合は必須です');
              return res;
            }
            break;
          case 'miscellaneousCost':
            if(this.miscellaneousCost == null  && this.miscellaneousRevenue != null && this.miscellaneousRevenue.length > 0) {
              res.push('雑収入を入力している場合は必須です');
              return res;
            }
            break;
        }
      },
      incomeCalc() {

        // 所得計算用変数
        var businessRevenue = 0;
        var businessCost = 0;
        var realEstateRevenue = 0;
        var realEstateCost = 0;
        var miscellaneousRevenue = 0;
        var miscellaneousCost = 0;
        // 各所得金額
        var businessIncome = 0;
        var realEstateIncome = 0;
        var miscellaneousIncome = 0;
        // 総所得金額
        var totalIncome = 0;
        
        // 事業所得の計算（収入と経費どちらかが空なら両方とも0にする）
        if (this.businessRevenue != null && this.businessRevenue.length > 0 && 
            this.businessCost != null && this.businessCost.length > 0) {

          // 計算のためカンマがあったら除く
          businessRevenue = Number(this.businessRevenue.replace(/,/g, ''));
          businessCost = Number(this.businessCost.replace(/,/g, ''));

          businessIncome = businessRevenue - businessCost;
          this.businessIncome = businessIncome;

        } else {
          this.businessIncome = "";
        }

        // 不動産所得の計算（収入と経費どちらかが空なら両方とも0にする）
        if (this.realEstateRevenue != null && this.realEstateRevenue.length > 0 && 
            this.realEstateCost != null && this.realEstateCost.length > 0) {

          // 計算のためカンマがあったら除く
          realEstateRevenue = Number(this.realEstateRevenue.replace(/,/g, ''));
          realEstateCost = Number(this.realEstateCost.replace(/,/g, ''));

          realEstateIncome = realEstateRevenue - realEstateCost;
          this.realEstateIncome = realEstateIncome;
          
        } else {
          this.realEstateIncome = "";
        }

        // 雑所得の計算（収入と経費どちらかが空なら両方とも0にする）
        if (this.miscellaneousRevenue != null && this.miscellaneousRevenue.length > 0 && 
            this.miscellaneousCost != null && this.miscellaneousCost.length > 0) {

          // 計算のためカンマがあったら除く
          miscellaneousRevenue = Number(this.miscellaneousRevenue.replace(/,/g, ''));
          miscellaneousCost = Number(this.miscellaneousCost.replace(/,/g, ''));

          miscellaneousIncome = miscellaneousRevenue - miscellaneousCost;
          this.miscellaneousIncome = miscellaneousIncome;
          
        } else {
          this.miscellaneousIncome = "";
        }

        // 全部0なら終了
        if (businessRevenue == 0 && businessCost == 0 && 
            realEstateRevenue == 0 && realEstateCost == 0 &&
            miscellaneousRevenue == 0 && miscellaneousCost == 0) {
          totalIncome = null;
          this.basicCalc(totalIncome);
          this.afterIncomeCalc();
          this.setCalcData(totalIncome);
          return;
        }

        // 総所得金額を計算
        totalIncome = businessIncome + realEstateIncome + miscellaneousIncome - this.declarationDeduction;
          
        // 総所得金額がマイナスなら0円にする
        if (totalIncome < 0) totalIncome = 0;

        // 各所得金額・課税所得・所得税額を3桁区切りにする
        this.businessIncome = this.businessIncome.toLocaleString();
        this.realEstateIncome = this.realEstateIncome.toLocaleString();
        this.miscellaneousIncome = this.miscellaneousIncome.toLocaleString();

        // 基礎控除額の計算
        this.basicCalc(totalIncome);

        this.afterIncomeCalc();

        this.setCalcData(totalIncome);
      },
      // 基礎控除額の計算
      basicCalc(totalIncome) {
        if (totalIncome == null) {
            this.basic = null;
          } else {
            // 基礎控除額の判定

            switch(true) {
              case totalIncome <= 24000000:  // 総所得金額が2400万以下
                this.basic = BasicDeducationValue.basic48;
                break;
              case 24000000 < totalIncome && totalIncome <= 24500000: // 総所得金額が2400万超2450万以下
                this.basic = BasicDeducationValue.basic32;
                break;
              case 24500000 < totalIncome  && totalIncome <= 25000000: // 総所得金額が2450万超2500万以下
                this.basic = BasicDeducationValue.basic16;
                break;
              default:
                this.basic = BasicDeducationValue.basic0;
            }
          }
      },
      afterIncomeCalc() {

        // 3桁区切りにする
        if (this.businessRevenue != null && this.businessRevenue.length > 0) {
          this.businessRevenue = Number(this.businessRevenue.replace(/,/g, '')).toLocaleString();
        }
        if (this.businessCost != null && this.businessCost.length > 0) {
          this.businessCost = Number(this.businessCost.replace(/,/g, '')).toLocaleString();
        }
        if (this.realEstateRevenue != null && this.realEstateRevenue.length > 0) {
          this.realEstateRevenue = Number(this.realEstateRevenue.replace(/,/g, '')).toLocaleString();
        }
        if (this.realEstateCost != null && this.realEstateCost.length > 0) {
          this.realEstateCost = Number(this.realEstateCost.replace(/,/g, '')).toLocaleString();
        }
        if (this.miscellaneousRevenue != null && this.miscellaneousRevenue.length > 0) {
          this.miscellaneousRevenue= Number(this.miscellaneousRevenue.replace(/,/g, '')).toLocaleString();
        }
        if (this.miscellaneousCost != null && this.miscellaneousCost.length > 0) {
          this.miscellaneousCost = Number(this.miscellaneousCost.replace(/,/g, '')).toLocaleString();
        }
      },
      // App.vueに返して、サブヘッダーの総所得金額表示とフッターの課税所得計算用に使用する
      setCalcData(totalIncome) {
        this.$emit('getCalcData', 
                   [
                     this.declarationDeduction,
                     this.businessRevenue,
                     this.businessCost,
                     this.realEstateRevenue,
                     this.realEstateCost,
                     this.miscellaneousRevenue,
                     this.miscellaneousCost,
                     this.basic,
                     totalIncome
                   ]
                 );
      }
    }
  };
</script>
