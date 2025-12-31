<template>
  <v-app>
    <!-- ナビゲーション -->
    <v-navigation-drawer id="nav" app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-1">
              <v-layout justify-center>入力・計算</v-layout>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name">
            <v-list-item :to="nav_list.link">
              <v-list-item-icon>
                <v-icon>{{ nav_list.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
          <hr>
          <v-list-item v-for="nav_list in nav_lists2" :key="nav_list.name">
            <v-list-item :to="nav_list.link">
              <v-list-item-icon>
                <v-icon>{{ nav_list.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
          <vue-adsense
            ad-client="ca-pub-4248082385618462"
            ad-slot="4794628428"
            ad-style="display:block"
            ad-format="auto">
          </vue-adsense>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <!-- ヘッダー -->
    <v-app-bar id="header" color="primary" dark app clipped-left>
      <v-app-bar-nav-icon v-on:click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><img alt="title logo" src="./assets/title.png">&nbsp;<img alt="title logo2" src="./assets/title2.png"></v-toolbar-title>
      <!--
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" text>Support<v-icon>mdi-menu-down</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title><v-icon>mdi-vuetify</v-icon>Consulting and support</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title><v-icon>mdi-discord</v-icon>Discord community</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      -->
    </v-app-bar>
    <v-main>
      <!-- サブヘッダー -->
      <div id="subHeader" clipped-left>
        <SubHeaderPage :_totalIncome="this.totalIncome" />
      </div>
      <!-- メインページ -->
      <router-view 
        :_declarationDeduction="this.declarationDeduction"
        :_businessRevenue="this.businessRevenue"
        :_businessCost="this.businessCost"
        :_realEstateRevenue="this.realEstateRevenue"
        :_realEstateCost="this.realEstateCost"
        :_miscellaneousRevenue="this.miscellaneousRevenue"
        :_miscellaneousCost="this.miscellaneousCost"
        :_syoukibokyousaiItems="this.syoukibokyousaiItems"
        :_yonmaruichiKItems="this.yonmaruichiKItems"
        :_partnerItems="this.partnerItems"
        :_socialInsurance="this.socialInsurance"
        :_syoukibokyousai="this.syoukibokyousai"
        :_yonmaruichiK="this.yonmaruichiK"
        :_lifeInsurance="this.lifeInsurance"
        :_earthquakeInsurance="this.earthquakeInsurance"
        :_widow="this.widow"
        :_singleParent="this.singleParent"
        :_handicapped="this.handicapped"
        :_partner="this.partner"
        :_support="this.support"
        :_miscellaneousLoss="this.miscellaneousLoss"
        :_medicalBills="this.medicalBills"
        :_donation="this.donation"
        :_salary="this.salary"
        :_transferred="this.transferred"
        :_businessOwnerDeduction="this.businessOwnerDeduction"
        :_businessTaxRate="this.businessTaxRate"
        :_totalIncome="this.totalIncome"
        :_basic="this.basic"
        @getCalcData="getCalcData"
        @getCalcDeduction="getCalcDeduction"
        @getPersonalBusinessTax="getPersonalBusinessTax"
      />
    </v-main>
    <!-- フッター -->
    <div id="footer">
       <FooterPage :array="[this.totalIncome, this.deduction, this.basic]" />
    </div>
  </v-app>
</template>

<script>
  import SubHeaderPage from './components/sub-header-page.vue'
  import FooterPage from './components/footer-page.vue'

  // 外部JSファイルのモジュールをインポートします。
  // モジュール名"Export"は任意です。
  // JSファイル名の".js"は記述しません。
  //import Init from "./js/init";

  export default {
    components:{
      SubHeaderPage,
      FooterPage
    },
    data(){
      return{
        drawer: null,
        // ナビーゲーションリスト
        nav_lists:[
          {name: '収入・経費の入力', icon: 'mdi-cash-multiple', link: '/'},
          {name: '控除の入力',icon: 'mdi-minus', link: '/deduction'}
        ],
        nav_lists2:[
          {name: '個人事業税の計算',icon: 'mdi-account-cash', link: '/personalBusinessTax'},
          {name: 'このサイトについて',icon: 'mdi-information-outline', link: '/about'},
        ],
        // income-page記憶用
        declarationDeduction: 0,
        businessRevenue: "",
        businessCost: "",
        realEstateRevenue: "",
        realEstateCost: "",
        miscellaneousRevenue: "",
        miscellaneousCost: "",

        // deduction-page記憶用
        syoukibokyousaiItems: [],
        yonmaruichiKItems: [],
        partnerItems: [],
        socialInsurance: "",
        syoukibokyousai: undefined,
        yonmaruichiK: undefined,
        lifeInsurance: "",
        earthquakeInsurance: "",
        widow: "0",
        singleParent: "0",
        handicapped: "0",
        partner: undefined,
        support: "0",
        miscellaneousLoss: "",
        medicalBills: "",
        donation: "",

        // personal-business-tax-page記憶用
        salary: "",
        transferred: "",
        businessOwnerDeduction: "2900000",
        businessTaxRate: "0.05",

        // FooterPageに渡す用
        totalIncome: 0,
        deduction: "",
        basic: 0
      }
    },
    mounted() {
      /*
      this.axios.get('https://ji-develop.com/tax-saving-calculation/php/getExplanation.php?id=1')
        .then((r) => {
          var elements = document.getElementsByClassName('explain');
          alert(r.data.text);
          elements.value= r.data.text;
          console.log(r);
        })
        .catch((e) => {
          alert(e);
        });
        */
    },
    methods: {
      getCalcData(array) {
        this.declarationDeduction = array[0];
        this.businessRevenue = array[1];
        this.businessCost = array[2];
        this.realEstateRevenue = array[3];
        this.realEstateCost = array[4];
        this.miscellaneousRevenue = array[5];
        this.miscellaneousCost = array[6];
        this.basic = array[7];
        this.totalIncome = array[8];
      },
      getCalcDeduction(array) {
        this.syoukibokyousaiItems = array[0],
        this.yonmaruichiKItems = array[1],
        this.partnerItems = array[2],
        this.socialInsurance = array[3],
        this.syoukibokyousai = array[4],
        this.yonmaruichiK = array[5],
        this.lifeInsurance = array[6],
        this.earthquakeInsurance = array[7],
        this.widow = array[8],
        this.singleParent = array[9],
        this.handicapped = array[10],
        this.partner = array[11],
        this.support = array[12],
        this.miscellaneousLoss = array[13],
        this.medicalBills = array[14],
        this.donation = array[15],
        this.deduction = array[16];
      },
      getPersonalBusinessTax(array) {
        this.salary = array[0];
        this.transferred = array[1];
        this.businessOwnerDeduction = array[2];
        this.businessTaxRate = array[3];
      }
    }
  };
</script>

<style lang="scss" scoped>
  #nav {
    z-index:3;
  }
  #header {
    z-index:2;
  }
  #subHeader {
    position: sticky;
    top: 55px;
    height:80px;
    background-color: #FFFFFF;
    border-style: solid;
    border-width: 3px;
    border-color: #FFFFFF #FFFFFF #4caf50 #FFFFFF;
    z-index:1;
  }
  @media screen and (min-width: 600px) {
    #footer {
      position: sticky;
      bottom: 0px;
      z-index:1;
    }
  }
</style>
