<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-shopping-cart"></i> ADD NEW TRANSACTION</span
                >
              </div>
              <div class="card-body">
                <form @submit.prevent="storeTransaction">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>QUANTITY</label>
                        <input
                          type="text"
                          v-model="transaction.quantity"
                          placeholder="Masukkan Nama Transaction"
                          class="form-control"
                        />
                        <div v-if="validation.quantity" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.quantity[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PRODUCT</label>
                        <select
                          class="form-control"
                          v-model="transaction.product_id"
                        >
                          <option value="">-- select product --</option>
                          <option
                            v-for="product in products"
                            :key="product.id"
                            :value="product.id"
                          >
                            {{ product.name }}
                          </option>
                        </select>
                        <div v-if="validation.product_id" class="mt-2">
                          <b-alert show variant="danger">{{
                            validation.product_id[0]
                          }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button class="btn btn-info mr-1 btn-submit" type="submit">
                    <i class="fa fa-paper-plane"></i> SAVE
                  </button>
                  <button class="btn btn-warning btn-reset" type="reset">
                    <i class="fa fa-redo"></i> RESET
                  </button>
                </form>
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
      title: "Add New Transaction",
    };
  },
  data() {
    return {
      //state transaction
      transaction: {
        quantity: "",
        product_id: "",
      },
      //state validation
      validation: [],
    };
  },

  //hook "asyncData"
  async asyncData({ store }) {
    //get list all products
    await store.dispatch("authenticated/product/getListAllProducts");
  },
  //computed
  computed: {
    //products
    products() {
      return this.$store.state.authenticated.product.products;
    },
  },

  methods: {
    //method "storeTransaction"
    async storeTransaction() {
      //define formData
      let formData = new FormData();
      formData.append("quantity", this.transaction.quantity);
      formData.append("product_id", this.transaction.product_id);

      //sending data to action "storeTransaction" vuex
      await this.$store
        .dispatch("authenticated/transaction/storeTransaction", formData)
        //success
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          //redirect route "authenticated-transactions"
          this.$router.push({
            name: "authenticated-transactions",
          });
        })
        //error
        .catch((error) => {
          //sweet alert
          this.$swal.fire({
            title: "ERROR!",
            text: "Coba Cek Stok Terlebih Dahulu!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
          //assign error to state "validation"
          this.validation = error.response.data;
        });
    },
  },
};
</script>
<style></style>
