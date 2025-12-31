<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="4" md="4" lg="4">
          <v-text-field
            v-model.number="totalIncome"
            label="総所得金額"
            filled
            readonly
            suffix="円"
            dense
            class="right-input mt-0"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'sub-header-page',
    props: {
      _totalIncome: Number
    },
    // propsに渡された親コンポーネントデータをこのコンポーネントに渡す
    computed: {
      totalIncome: {
        get() {
          return this._totalIncome != null ? this._totalIncome.toLocaleString() : "";
        }
      }
    }
  }
</script>
