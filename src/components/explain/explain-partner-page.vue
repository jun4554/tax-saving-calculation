<template>
  <v-select
    v-model="partner"
    item-text="label"
    item-value="value"
    :items="partnerItems"
    label="配偶者（特別）控除"
    outlined
    @blur="onBlur()"
    @change="onChange()"
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
            <v-toolbar color="primary" dark><strong>配偶者（特別）控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 420px;">
              <div class="explain">
                <p>控除対象配偶者がいる場合に受けられる控除。</p>
                <p>配偶者の所得が48万円以下の場合適用されるが、それより上の場合でも133万以下であれば「配偶者特別控除」として所得に応じた控除が適用できる。</p>
                <p>なお、納税者の所得が900万を超える場合、配偶者の所得だけでなく納税者の所得も控除額に影響する。</p>
                <p>最低10,000円、最大480,000円が控除対象。</p>
              </div>
              <div class="text-right">
                <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1191.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（配偶者控除）</a></p>
                <p><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1195.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（配偶者特別控除）</a></p>
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
  </v-select>
</template>

<script>
  export default {
    name: 'explain-partner-page',
    props: {
      _partner: Number,
      _partnerItems: []
    },
    data () {
      return {
        partner: this._partner,
        partnerItems: this._partnerItems,
        dialog: ""
      }
    },
    methods: {
      onBlur: function() {
        if (this.partner == null || this.partner == "" ) {
          this.partner = undefined;
        }
      },
      onChange: function () {
        if (this.partner == 0) {
          this.partner = null;
        }
        this.setPartner();
      },
      setPartner() {
        this.$emit('getPartner', this.partner);
      }
    }
  }
</script>