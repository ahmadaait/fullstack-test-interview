<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-shopping-cart"></i> TRANSACTIONS</span
                >
              </div>
              <div class="card-body">
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <nuxt-link
                        :to="{ name: 'authenticated-transactions-create' }"
                        class="btn btn-warning btn-sm"
                        style="padding-top: 10px"
                      >
                        <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link
                      >
                    </div>
                    <input
                      v-model="search"
                      @keypress.enter="searchData"
                      type="text"
                      class="form-control"
                      placeholder="cari berdasarkan nama transaction"
                    />
                    <div class="input-group-append">
                      <button @click="searchData" class="btn btn-warning">
                        <i class="fa fa-search"></i>
                        SEARCH
                      </button>
                    </div>
                  </div>
                </div>
                <b-table
                  striped
                  bordered
                  hover
                  :items="transactions.data"
                  :fields="fields"
                  show-empty
                >
                  <template v-slot:cell(actions)="row">
                    <b-button
                      :to="{
                        name: 'authenticated-transactions-show-id',
                        params: { id: row.item.id },
                      }"
                      variant="info"
                      size="sm"
                    >
                      DETAIL
                    </b-button>
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination
                  align="right"
                  :value="transactions.current_page"
                  :total-rows="transactions.total"
                  :per-page="transactions.per_page"
                  @change="changePage"
                  aria-controls="my-table"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  //layout
  layout: "authenticated",
  //meta
  head() {
    return {
      title: "Transactions",
    };
  },
  //data function
  data() {
    return {
      //table header
      fields: [
        {
          label: "No Referensi",
          key: "reference_no",
        },
        {
          label: "Nama Produk",
          key: "product.name",
        },
        {
          label: "Harga",
          key: "price",
        },
        {
          label: "Quantity",
          key: "quantity",
        },
        {
          label: "Jumlah Pembayaran",
          key: "payment_amount",
        },
        {
          label: "Actions",
          key: "actions",
          tdClass: "text-center",
        },
      ],

      // state search
      search: "",
    };
  },

  //hook "asyncData"
  async asyncData({ store }) {
    await store.dispatch("authenticated/transaction/getTransactionsData");
  },

  //computed
  computed: {
    //transactions
    transactions() {
      return this.$store.state.authenticated.transaction.transactions;
    },
  },

  //method
  methods: {
    //method "searchData"
    searchData() {
      //commit to mutation "SET_PAGE"
      this.$store.commit("authenticated/transaction/SET_PAGE", 1);
      //dispatch on action "getTransactionsData"
      this.$store.dispatch(
        "authenticated/transaction/getTransactionsData",
        this.search
      );
    },

    //method "changePage"
    changePage(page) {
      //commit to mutation "SET_PAGE"
      this.$store.commit("authenticated/transaction/SET_PAGE", page);
      //dispatch on action "getTransactionsData"
      this.$store.dispatch(
        "authenticated/transaction/getTransactionsData",
        this.search
      );
    },
  },
};
</script>
<style></style>
