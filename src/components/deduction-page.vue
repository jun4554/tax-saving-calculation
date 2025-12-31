<template>
  <v-form>
    <v-container>
      <v-row/>
      <!-- 社会保険料控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainSocialInsurancePage
            :_socialInsurance="this.socialInsurance"
            @getSocialInsurance="getSocialInsurance"
          />
        </v-col>
      </v-row>

      <!-- 小規模企業共済掛金控除 -->
      <v-row dense>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <v-select
            v-model="syoukibokyousai"
            item-text="label"
            item-value="value"
            :items="syoukibokyousaiItems"
            label="小規模企業共済掛金控除"
            outlined
            @blur="onBlur('syoukibokyousai')"
            @change="onChange('syoukibokyousai')"
            dense
          >
          </v-select>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainSyoukibokyousaiPage 
            :_syoukibokyousai="this.syoukibokyousai"
            @getSyoukibokyousaiYear="getSyoukibokyousaiYear"
          />
        </v-col>
      </v-row>

      <!-- 確定拠出年金掛金控除 -->
      <v-row dense>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <v-select
            v-model="yonmaruichiK"
            item-text="label"
            item-value="value"
            :items="yonmaruichiKItems"
            label="確定拠出年金掛金控除"
            outlined
            @blur="onBlur('yonmaruichiK')"
            @change="onChange('yonmaruichiK')"
            dense
          >
          </v-select>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainYonmaruichiKPage 
            :_yonmaruichiK="this.yonmaruichiK"
            @getYonmaruichiKYear="getYonmaruichiKYear"
          />
        </v-col>
      </v-row>

      <!-- 生命保険料控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainLifeInsurancePage
            :_lifeInsurance="this.lifeInsurance"
            @getLifeInsurance="getLifeInsurance"
          />
        </v-col>
      </v-row>

      <!-- 地震保険料控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainEarthquakeInsurancePage
            :_earthquakeInsurance="this.earthquakeInsurance"
            @getEarthquakeInsurance="getEarthquakeInsurance"
          />
        </v-col>
      </v-row>

      <!-- 寡婦控除 -->
      <v-row>
        <v-col cols="12">
          <ExplainWidowPage
            :_widow="this.widow"
            @getWidow="getWidow"
          />
        </v-col>
      </v-row>

      <!-- ひとり親控除 -->
      <v-row>
        <v-col cols="12">
          <ExplainSingleParentPage
            :_singleParent="this.singleParent"
            @getSingleParent="getSingleParent"
          />
        </v-col>
      </v-row>

      <!-- 障害者控除 -->
      <v-row>
        <v-col cols="12">
          <ExplainHandicappedPage
            :_handicapped="this.handicapped"
            @getHandicapped="getHandicapped"
          />
        </v-col>
      </v-row>

      <!-- 配偶者（特別）控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainPartnerPage
            :_partner="this.partner"
            :_partnerItems="this.partnerItems"
            @getPartner="getPartner"
          />
        </v-col>
      </v-row>

      <!-- 扶養控除 -->
      <v-row>
        <v-col cols="12">
          <ExplainSupportPage
            :_support="this.support"
            @getSupport="getSupport"
          />
        </v-col>
      </v-row>

      <!-- 基礎控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainBasicPage :_basic="this._basic" />
        </v-col>
      </v-row>

      <!-- 雑損控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainMiscellaneousLossPage 
            :_miscellaneousLoss="this.miscellaneousLoss"
            @getMiscellaneousLoss="getMiscellaneousLoss"
          />
        </v-col>
      </v-row>

      <!-- 医療費控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainMedicalBillsPage
            :_medicalBills="this.medicalBills"
            @getMedicalBills="getMedicalBills"
          />
        </v-col>
      </v-row>

      <!-- 寄付金控除 -->
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="6" lg="6">
          <ExplainDonationPage
            :_donation="this.donation"
            @getDonation="getDonation"
          />
        </v-col>
      </v-row>

    </v-container>
  </v-form>
</template>

<script>
  import ExplainSocialInsurancePage from '../components/explain/explain-social-insurance-page'
  import ExplainSyoukibokyousaiPage from '../components/explain/explain-syoukibokyousai-page'
  import ExplainYonmaruichiKPage from '../components/explain/explain-yonmaruichiK-page'
  import ExplainLifeInsurancePage from '../components/explain/explain-life-insurance-page'
  import ExplainEarthquakeInsurancePage from '../components/explain/explain-earthquake-insurance-page'
  import ExplainWidowPage from '../components/explain/explain-widow-page'
  import ExplainSingleParentPage from '../components/explain/explain-single-parent-page'
  import ExplainHandicappedPage from '../components/explain/explain-handicapped-page'
  import ExplainPartnerPage from '../components/explain/explain-partner-page'
  import ExplainSupportPage from '../components/explain/explain-support-page'
  import ExplainBasicPage from '../components/explain/explain-basic-page'
  import ExplainMiscellaneousLossPage from '../components/explain/explain-miscellaneous-loss-page'
  import ExplainMedicalBillsPage from '../components/explain/explain-medical-bills-page'
  import ExplainDonationPage from '../components/explain/explain-donation-page'

  export default {
    name: 'deduction-page',
    components:{
      ExplainSocialInsurancePage,
      ExplainSyoukibokyousaiPage,
      ExplainYonmaruichiKPage,
      ExplainLifeInsurancePage,
      ExplainEarthquakeInsurancePage,
      ExplainWidowPage,
      ExplainSingleParentPage,
      ExplainHandicappedPage,
      ExplainPartnerPage,
      ExplainSupportPage,
      ExplainBasicPage,
      ExplainMiscellaneousLossPage,
      ExplainMedicalBillsPage,
      ExplainDonationPage
    },
    props: {
      _syoukibokyousaiItems: [],
      _yonmaruichiKItems: [],
      _partnerItems: [],
      _socialInsurance: String,
      _syoukibokyousai: Number,
      _yonmaruichiK: Number,
      _lifeInsurance: String,
      _earthquakeInsurance: String,
      _widow: String,
      _singleParent: String,
      _handicapped: String,
      _partner: Number,
      _support: String,
      _miscellaneousLoss: String,
      _medicalBills: String,
      _donation: String,
      _basic: Number
    },
    data () {
      return {
        syoukibokyousaiItems: this._syoukibokyousaiItems,
        yonmaruichiKItems: this._yonmaruichiKItems,
        partnerItems: this._partnerItems,

        socialInsurance: this._socialInsurance,
        syoukibokyousai: this._syoukibokyousai,
        yonmaruichiK: this._yonmaruichiK,
        lifeInsurance: this._lifeInsurance,
        earthquakeInsurance: this._earthquakeInsurance,
        widow: this._widow,
        singleParent: this._singleParent,
        handicapped: this._handicapped,
        partner: this._partner,
        support: this._support,
        miscellaneousLoss: this._miscellaneousLoss,
        medicalBills: this._medicalBills,
        donation: this._donation,
        deduction: ""
      }
    },
    mounted: function() {
      // 小規模企業共済掛金控除の選択肢生成
      if (this.syoukibokyousaiItems.length == 0) {
        this.axios.get('https://ji-develop.com/tax-saving-calculation/php/getSelectItem.php', {
          params: {
            id: 3
          }
        })
        .then((r) => {
          this.syoukibokyousaiItems.push({label: '', value: 0})
          for (var i = 0; i < r.data.selectItemData.length; i++) {
            this.syoukibokyousaiItems.push({label: Number(r.data.selectItemData[i].value).toLocaleString() + "円/月", value: Number(r.data.selectItemData[i].value)})
          }
        })
        .catch((e) => {
          alert(e);
        });
      }

      // 確定拠出年金掛金控除の選択肢生成
      if (this.yonmaruichiKItems.length == 0) {
        this.axios.get('https://ji-develop.com/tax-saving-calculation/php/getSelectItem.php', {
          params: {
            id: 4
          }
        })
        .then((r) => {
          this.yonmaruichiKItems.push({label: '', value: 0})
          for (var i = 0; i < r.data.selectItemData.length; i++) {
            this.yonmaruichiKItems.push({label: Number(r.data.selectItemData[i].value).toLocaleString() + "円/月", value: Number(r.data.selectItemData[i].value)})
          }
        })
        .catch((e) => {
          alert(e);
        });
      }

      // 配偶者（特別）控除の選択肢生成
      if (this.partnerItems.length == 0) {
        this.axios.get('https://ji-develop.com/tax-saving-calculation/php/getSelectItem.php', {
          params: {
            id: 5
          }
        })
        .then((r) => {
          this.partnerItems.push({label: '', value: 0})
          for (var i = 0; i < r.data.selectItemData.length; i++) {
            this.partnerItems.push({label: Number(r.data.selectItemData[i].value).toLocaleString() + "円", value: Number(r.data.selectItemData[i].value)})
          }
        })
        .catch((e) => {
          alert(e);
        });
      }
    },
    methods: {
      onBlur: function(e) {
        switch (e) {
          case 'syoukibokyousai':
            if (this.syoukibokyousai == null || this.syoukibokyousai == "" ) {
              this.syoukibokyousai = undefined;
            }
            break;
          case 'yonmaruichiK':
            if (this.yonmaruichiK == null || this.yonmaruichiK == "" ) {
              this.yonmaruichiK = undefined;
            }
            break;
        }
      },
      onChange: function (e) {
        switch (e) {
          case 'syoukibokyousai':
            if (this.syoukibokyousai == 0) {
              this.syoukibokyousai = null;
            }
            break;
          case 'yonmaruichiK':
            if (this.yonmaruichiK == 0) {
              this.yonmaruichiK = null;
            }
            break;
        }
      },
      getSocialInsurance(arg) {
        this.socialInsurance = arg;
        this.deducationCalc();
      },
      getSyoukibokyousaiYear(arg) {
        this.syoukibokyousaiYear = arg;
        this.deducationCalc();
      },
      getYonmaruichiKYear(arg) {
        this.yonmaruichiKYear = arg;
        this.deducationCalc();
      },
      getLifeInsurance(arg) {
        this.lifeInsurance = arg;
        this.deducationCalc();
      },
      getEarthquakeInsurance(arg) {
        this.earthquakeInsurance = arg;
        this.deducationCalc();
      },
      getWidow(arg) {
        this.widow = arg;
        this.deducationCalc();
      },
      getSingleParent(arg) {
        this.singleParent = arg;
        this.deducationCalc();
      },
      getHandicapped(arg) {
        this.handicapped = arg;
        this.deducationCalc();
      },
      getPartner(arg) {
        this.partner = arg;
        this.deducationCalc();
      },
      getSupport(arg) {
        this.support = arg;
        this.deducationCalc();
      },
      getMiscellaneousLoss(arg) {
        this.miscellaneousLoss = arg;
        this.deducationCalc();
      },
      getMedicalBills(arg) {
        this.medicalBills = arg;
        this.deducationCalc();
      },
      getDonation(arg) {
        this.donation = arg;
        this.deducationCalc();
      },
      deducationCalc() {
        var deduction = 0;

        // 社会保険料控除
        if (this.socialInsurance != null && this.socialInsurance.length > 0) {
          deduction += Number(this.socialInsurance.replace(/,/g, ''));
        }
        // 小規模共済掛金控除
        if (this.syoukibokyousai != undefined) deduction += this.syoukibokyousaiYear;
        // 確定拠出年金掛金控除
        if (this.yonmaruichiK != undefined) deduction += this.yonmaruichiKYear;
        // 生命保険料控除
        if (this.lifeInsurance != null && this.lifeInsurance.length > 0) {
          deduction += Number(this.lifeInsurance.replace(/,/g, ''));
        }
        // 地震保険料控除
        if (this.earthquakeInsurance != null && this.earthquakeInsurance.length > 0) {
          deduction += Number(this.earthquakeInsurance.replace(/,/g, ''));
        }
        // 寡婦控除
        deduction += Number(this.widow);
        // ひとり親控除
        deduction += Number(this.singleParent);
        // 障害者控除
        deduction += Number(this.handicapped);
        // 配偶者（特別）控除
        if (this.partner != undefined) deduction += this.partner;
        // 扶養控除
        deduction += Number(this.support);
        // 雑損控除
        if (this.miscellaneousLoss != null && this.miscellaneousLoss.length > 0) {
          deduction += Number(this.miscellaneousLoss.replace(/,/g, ''));
        }
        // 医療費控除
        if (this.medicalBills != null && this.medicalBills.length > 0) {
          deduction += Number(this.medicalBills.replace(/,/g, ''));
        }
        // 寄付金控除
        if (this.donation != null && this.donation.length > 0) {
          deduction += Number(this.donation.replace(/,/g, ''));
        }

        // App.vueに返して、フッターの課税所得計算用に使用する
        this.$emit('getCalcDeduction', 
                    [
                      this.syoukibokyousaiItems,
                      this.yonmaruichiKItems,
                      this.partnerItems,
                      this.socialInsurance,
                      this.syoukibokyousai,
                      this.yonmaruichiK,
                      this.lifeInsurance,
                      this.earthquakeInsurance,
                      this.widow,
                      this.singleParent,
                      this.handicapped,
                      this.partner,
                      this.support,
                      this.miscellaneousLoss,
                      this.medicalBills,
                      this.donation,
                      deduction
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
