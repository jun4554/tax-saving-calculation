<template>
  <v-text-field
    v-model.number="yonmaruichiKYear"
    suffix="円/年間"
    readonly
    rounded
    background-color="#f5f5f5"
    class="right-input"
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
            <v-toolbar color="primary" dark><strong>確定拠出年金掛金控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 340px;"> 
              <div class="explain">
                <p>掛金を自身で運用しながら積立ていく退職金制度に支払った控除。</p>
                <p>個人事業主の場合、月々の掛金は5,000~68,000円まで1,000円単位で設定可能で、増額・減額もできる。</p>
                <p>金融商品の運用のため、元本割れする可能性がある。<br>また、運用には月々手数料がかかることにも注意。</p>
                <p>納めた金額は全額控除対象。</p>
              </div>
              <div class="text-right">
                <a href="https://www.ideco-koushiki.jp" target="_blank" rel="noopener noreferrer">参考：イデコ公式サイト</a>
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
    name: 'explain-yonmaruichiK-page',
    props: {
      _yonmaruichiK: Number
    },
    data () {
      return {
        dialog: ""
      }
    },
    computed: {
      yonmaruichiKYear: {
        get() {
          if (this._yonmaruichiK == null || this._yonmaruichiK == "") {
            this.$emit('getYonmaruichiKYear', 0);
            return "";
          } else {
            var yonmaruichiKYear = this._yonmaruichiK * 12;
            this.$emit('getYonmaruichiKYear', yonmaruichiKYear);
            return yonmaruichiKYear.toLocaleString();
          }
        }
      }
    }
  }
</script>