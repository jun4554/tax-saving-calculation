<template>
  <div>
    <span class="grey--text text--darken-2">障害者控除</span>
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
          <v-toolbar color="primary" dark><strong>障害者控除</strong></v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 340px;">
            <div class="explain">
              <p>本人や配偶者または扶養親族に障害者がいる場合に受けられる控除。</p>
              <p>配偶者の所得は48万円以下である必要がある。</p>
              <p>控除対象者がいる場合、27万円が控除となるが、特別障害者の対象になると40万円控除になる。</p>
              <p>さらに、同居を常にしていると75万円控除となる。</p>
            </div>
            <div class="text-right">
              <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1160.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（障害者控除）</a></p>
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
      v-model="handicapped"
      row
      @change="onChange()"
    >
      <v-radio label="なし" value="0" />
      <v-radio label="27万円" value="270000" />
      <v-radio label="40万円" value="400000" />
      <v-radio label="75万円" value="750000" />
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'explain-handicapped-page',
    props: {
      _handicapped: String
    },
    data () {
      return {
        handicapped: this._handicapped,
        dialog: ""
      }
    },
    methods: {
      onChange: function () {
        this.setHandicapped();
      },
      setHandicapped() {
        this.$emit('getHandicapped', this.handicapped);
      }
    }
  }
</script>