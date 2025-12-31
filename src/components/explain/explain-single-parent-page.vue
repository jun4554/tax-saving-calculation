<template>
  <div>
    <span class="grey--text text--darken-2">ひとり親控除</span>
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
          <v-toolbar color="primary" dark><strong>ひとり親控除</strong></v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 180px;">
            <div class="explain">
              <p>生計を一にする子をもつ、ひとり親である人が受けられる控除。<br>控除を受けるには一定の条件が必要。</p>
              <p>控除額は35万円。</p>
            </div>
            <div class="text-right">
              <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1171.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（ひとり親控除）</a>
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
      v-model="singleParent"
      row
      @change="onChange()"
    >
      <v-radio label="なし" value="0" />
      <v-radio label="35万円" value="350000" />
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'explain-single-parent-page',
    props: {
      _singleParent: String
    },
    data () {
      return {
        singleParent: this._singleParent,
        dialog: ""
      }
    },
    methods: {
      onChange: function () {
        this.setSingleParent();
      },
      setSingleParent() {
        this.$emit('getSingleParent', this.singleParent);
      }
    }
  }
</script>