<template>
  <v-text-field
    v-model="donation"
    inputmode="numeric"
    label="寄付金控除"
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
            <v-toolbar color="primary" dark><strong>寄付金控除</strong></v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 230px;">
              <div class="explain">
                <p>国や地方公共団体に対して寄付した場合に受けられる控除。</p>
                <p>ふるさと納税に寄付した金額もここに当たる。</p>
                <p>寄付金額 - 2,000円が控除対象。</p>
              </div>
              <div class="text-right">
                <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1150.htm" target="_blank" rel="noopener noreferrer">参考：国税庁（寄付金控除）</a>
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
    name: 'explain-donation-page',
    props: {
      _donation: String
    },
    data () {
      return {
        donation: this._donation,
        dialog: ""
      }
    },
    methods: {
      onFocus: function() {
        if (this.donation != null && this.donation.length > 0) {
          this.donation = this.donation.toString().replace(/,/g, '');
        }
      },
      onBlur: function() {
        if (this.donation != null && this.donation.length > 0) {
          this.donation = Number(this.donation.replace(/[\D,]/g, '')).toLocaleString();
        }
        this.setDonation();
      },
      onClear: function () {
        // クリアボタンを押しても内部では数値を保持しているので初期化する
        this.donation = "";
        this.setDonation();
      },
      setDonation() {
        this.$emit('getDonation', this.donation);
      }
    }
  }
</script>