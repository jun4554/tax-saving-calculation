<template>
  <div>
    <span class="grey--text text--darken-2">基礎控除</span>
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
          <v-toolbar color="primary" dark><strong>基礎控除</strong></v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 240px;">
            <div class="explain">
              <p>一律無条件で誰にでも適用される控除。<br>基礎控除額は48万円。</p>
              <p>ただし、令和2年分以降より納税者の所得金額に応じて控除額も480,000円、320,000円、160,000円、0円と変更になる。</p>
            </div>
            <div class="text-right">
              <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1199.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（基礎控除）</a></p>
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
    <v-text-field
      v-model.number="basic"
      suffix="円"
      readonly
      rounded
      background-color="#f5f5f5"
      class="right-input"
      dense
    ></v-text-field>
  </div>
</template>

<script>
  export default {
    name: 'explain-basic-page',
    props: {
      _basic: Number
    },
    data () {
      return {
        basic: this._basic != null ? this._basic.toLocaleString() : "",
        dialog: ""
      }
    }
  }
</script>