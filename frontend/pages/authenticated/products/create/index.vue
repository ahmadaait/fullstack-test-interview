<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-folder"></i> ADD NEW PRODUCT</span
                >
              </div>
              <div class="card-body">
                <form @submit.prevent="storeProduct">
                  <div class="form-group">
                    <label>NAMA PRODUCT</label>
                    <input
                      type="text"
                      v-model="product.name"
                      placeholder="Masukkan Nama Product"
                      class="form-control"
                    />
                    <div v-if="validation.name" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.name[0]
                      }}</b-alert>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>HARGA PRODUCT</label>
                    <input
                      type="text"
                      v-model="product.price"
                      placeholder="Masukkan Harga Product"
                      class="form-control"
                    />
                    <div v-if="validation.price" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.price[0]
                      }}</b-alert>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>STOK PRODUCT</label>
                    <input
                      type="text"
                      v-model="product.stock"
                      placeholder="Masukkan Stok Product"
                      class="form-control"
                    />
                    <div v-if="validation.stock" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.stock[0]
                      }}</b-alert>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>DESKRIPSI PRODUCT</label>
                    <input
                      type="text"
                      v-model="product.description"
                      placeholder="Masukkan Deskripsi Product"
                      class="form-control"
                    />
                    <div v-if="validation.description" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.description[0]
                      }}</b-alert>
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
      title: "Add New Product",
    };
  },
  data() {
    return {
      //state product
      product: {
        name: "",
        price: "",
        stock: "",
        description: "",
      },
      //state validation
      validation: [],
    };
  },
  methods: {
    //method "storeProduct"
    async storeProduct() {
      //define formData
      let formData = new FormData();
      formData.append("name", this.product.name);
      formData.append("price", this.product.price);
      formData.append("stock", this.product.stock);
      formData.append("description", this.product.description);
      //sending data to action "storeProduct" vuex
      await this.$store
        .dispatch("authenticated/product/storeProduct", formData)
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
          //redirect route "authenticated-products"
          this.$router.push({
            name: "authenticated-products",
          });
        })
        //error
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data;
        });
    },
  },
};
</script>
<style></style>
