<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold">
                  <i class="fa fa-folder"></i> DETAIL TRANSACTION
                </span>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>REF NO.</label>
                      <input
                        type="text"
                        v-model="transaction.reference_no"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>NAMA PRODUK</label>
                      <input
                        type="text"
                        v-model="transaction.product_name"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>HARGA</label>
                      <input
                        type="text"
                        v-model="transaction.price"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>QUANTITY</label>
                      <input
                        type="text"
                        v-model="transaction.quantity"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>JUMLAH PEMBAYARAN</label>
                      <input
                        type="text"
                        v-model="transaction.payment_amount"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div
                    class="col-md-6 d-flex align-items-center justify-content-center mt-3"
                  >
                    <nuxt-link
                      :to="{ name: 'authenticated-transactions' }"
                      class="btn btn-info mr-1"
                    >
                      KEMBALI
                    </nuxt-link>
                  </div>
                </div>
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
      title: "Detail Transaction",
    };
  },

  data() {
    return {
      //state transaction
      transaction: {
        reference_no: "",
        price: "",
        quantity: "",
        payment_amount: "",
        product_id: "",
        product_name: "",
      },
    };
  },

  //hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch(
      "authenticated/transaction/getDetailTransaction",
      route.params.id
    );
  },

  // computed
  computed: {
    //products
    products() {
      return this.$store.state.authenticated.product.products;
    },
  },

  //mounted
  mounted() {
    this.transaction.reference_no =
      this.$store.state.authenticated.transaction.transaction.reference_no;
    this.transaction.price =
      this.$store.state.authenticated.transaction.transaction.price;
    this.transaction.quantity =
      this.$store.state.authenticated.transaction.transaction.quantity;
    this.transaction.payment_amount =
      this.$store.state.authenticated.transaction.transaction.payment_amount;
    this.transaction.product_id =
      this.$store.state.authenticated.transaction.transaction.product_id;
    this.transaction.product_id =
      this.$store.state.authenticated.transaction.transaction.product_id;
    this.transaction.product_name =
      this.$store.state.authenticated.transaction.transaction.product.name;
  },
};
</script>
<style></style>
