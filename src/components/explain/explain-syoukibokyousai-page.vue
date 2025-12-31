<template>
  <v-text-field
    v-model.number="syoukibokyousaiYear"
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
            <v-toolbar color="primary" dark><strong>小規模企業共済掛金控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 230px;"> 
              <div class="explain">
                <p>月々の掛金は1,000~70,000円まで500円単位で設定可能で、加入後の増額・減額もできる。</p>
                <p>納めた金額は全額控除対象。</p>
              </div>
              <div class="text-right">
                <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1135.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（小規模企業共済掛金控除）</a></p>
                <p><a href="https://www.smrj.go.jp/kyosai/skyosai/index.html" target="_blank" rel="noopener noreferrer">参考：中小機構</a></p>
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
    name: 'explain-syoukibokyousai-page',
    props: {
      _syoukibokyousai: Number
    },
    data () {
      return {
        dialog: ""
      }
    },
    computed: {
      syoukibokyousaiYear: {
        get() {
          if (this._syoukibokyousai == null || this._syoukibokyousai == "") {
            this.$emit('getSyoukibokyousaiYear', 0);
            return "";
          } else {
            var syoukibokyousaiYear = this._syoukibokyousai * 12;
            this.$emit('getSyoukibokyousaiYear', syoukibokyousaiYear);
            return syoukibokyousaiYear.toLocaleString();
          }
        }
      }
    }
  }
</script>