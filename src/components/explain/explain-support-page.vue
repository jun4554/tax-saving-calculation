<template>
  <div>
    <span class="grey--text text--darken-2">扶養控除</span>
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
          <v-toolbar color="primary" dark><strong>扶養控除</strong></v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 220px;">
            <div class="explain">
              <p>16歳以上の控除対象扶養親族がいる場合に受けられる控除。</p>
              <p>控除額は扶養親族の年齢・同居の有無により、38万、48万、58万、63万と控除額が変わる。</p>
            </div>
            <div class="text-right">
              <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1180.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（扶養控除）</a></p>
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
      v-model="support"
      row
      @change="onChange()"
    >
      <v-radio label="なし" value="0" />
      <v-radio label="38万円" value="380000" />
      <v-radio label="48万円" value="480000" />
      <v-radio label="58万円" value="580000" />
      <v-radio label="63万円" value="630000" />
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'explain-support-page',
    props: {
      _support: String
    },
    data () {
      return {
        support: this._support,
        dialog: ""
      }
    },
    methods: {
      onChange: function () {
        this.setSupport();
      },
      setSupport() {
        this.$emit('getSupport', this.support);
      }
    }
  }
</script>