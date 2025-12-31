<template>
  <div>
    <span class="grey--text text--darken-2">寡婦控除</span>
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
          <v-toolbar color="primary" dark><strong>寡婦控除</strong></v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 320px;">
            <div class="explain">
              <p>配偶者と離婚・死別し、再婚していない人が受けられる控除。<br>ひとり親には該当していない等、控除を受けるには一定の条件が必要。</p>
              <p>控除額は27万円。</p>
              <p>※寡夫控除及び特別の寡婦控除は令和2年度から廃止。</p>
            </div>
            <div class="text-right">
              <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1170.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（寡婦控除）</a></p>
              <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1172.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（寡夫控除）</a></p>
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
    <v-radio-group
      v-model="widow"
      row
      @change="onChange()"
    >
      <v-radio label="なし" value="0" />
      <v-radio label="27万円" value="270000" />
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'explain-widow-page',
    props: {
      _widow: String
    },
    data () {
      return {
        widow: this._widow,
        dialog: ""
      }
    },
    methods: {
      onChange: function () {
        this.setWidow();
      },
      setWidow() {
        this.$emit('getWidow', this.widow);
      }
    }
  }
</script>