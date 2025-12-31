<template>
  <v-text-field
    v-model="miscellaneousLoss"
    inputmode="numeric"
    label="雑損控除"
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
            <v-toolbar color="primary" dark><strong>雑損控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 250px;">
              <div class="explain">
                <p>災害や盗難などによって受けた損失を差し引くことができる控除。</p>
                <p>納税者または所得が48万円以下の配偶者や親族の資産が対象となる。</p>
                <p>ただし、「事業用の固定資産」や「生活に通常必要でない資産」は対象にならない。</p>
              </div>
              <div class="text-right">
                <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1110.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（雑損控除）</a>
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
    name: 'explain-miscellaneous-loss-page',
    props: {
      _miscellaneousLoss: String
    },
    data () {
      return {
        miscellaneousLoss: this._miscellaneousLoss,
        dialog: ""
      }
    },
    methods: {
      onFocus: function() {
        if (this.miscellaneousLoss != null && this.miscellaneousLoss.length > 0) {
          this.miscellaneousLoss = this.miscellaneousLoss.toString().replace(/,/g, '');
        }
      },
      onBlur: function() {
        if (this.miscellaneousLoss != null && this.miscellaneousLoss.length > 0) {
          this.miscellaneousLoss = Number(this.miscellaneousLoss.replace(/[\D,]/g, '')).toLocaleString();
        }
        this.setMiscellaneousLoss();
      },
      onClear: function () {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        this.miscellaneousLoss = "";
        this.setMiscellaneousLoss();
      },
      setMiscellaneousLoss() {
        this.$emit('getMiscellaneousLoss', this.miscellaneousLoss);
      }
    }
  }
</script>