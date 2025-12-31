<template>
  <v-text-field
    v-model="socialInsurance"
    inputmode="numeric"
    label="社会保険料控除"
    suffix="円"
    clearable
    class="right-input ime-disabled"
    maxlength="12"
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
            <v-toolbar color="primary" dark><strong>社会保険料控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 240px;">
              <div class="explain">
                <p ref="explain">個人事業主では、主に国民年金・国民健康保険で収めた金額の控除。<br>国民年金基金の掛金控除もここに当たる。</p>
                <p>配偶者や子どもなど他の親族の分も対象にできる。</p>
                <p>納めた金額は全額控除対象。</p>
              </div>
              <div class="text-right">
                <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1130.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（社会保険料控除）</a>
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
    name: 'explain-social-insurance-page',
    props: {
      _socialInsurance: String
    },
    data () {
      return {
        socialInsurance: this._socialInsurance,
        dialog: "",
      }
    },
    mounted() {
      /*
      //var elements = document.getElementsByClassName('explain');
      //alert('abc:' + elements.value)
      //alert(this.$refs['explain']);

      var aaa = this.$refs.explain.textContent;
      alert(aaa)
      aaa = "bbb"
      alert(aaa);
      */
    },
    methods: {
      onFocus: function() {
        if (this.socialInsurance != null && this.socialInsurance.length > 0) {
          this.socialInsurance = this.socialInsurance.toString().replace(/,/g, '');
        }
      },
      onBlur: function() {
        if (this.socialInsurance != null && this.socialInsurance.length > 0) {
          this.socialInsurance = Number(this.socialInsurance.replace(/[\D,]/g, '')).toLocaleString();
        }
        this.setSocialInsurance();
      },
      onClear: function () {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        this.socialInsurance = "";
        this.setSocialInsurance();
      },
      setSocialInsurance() {
        this.$emit('getSocialInsurance', this.socialInsurance);
      }
    }
  }
</script>