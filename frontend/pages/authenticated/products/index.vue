<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-folder"></i> PRODUCTS</span
                >
              </div>
              <div class="card-body">
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <nuxt-link
                        :to="{ name: 'authenticated-products-create' }"
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
                      placeholder="cari berdasarkan nama product"
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
                  :items="products.data"
                  :fields="fields"
                  show-empty
                >
                  <template v-slot:cell(actions)="row">
                    <b-button
                      :to="{
                        name: 'authenticated-products-edit-id',
                        params: { id: row.item.id },
                      }"
                      variant="info"
                      size="sm"
                    >
                      EDIT
                    </b-button>
                    <b-button
                      variant="danger"
                      size="sm"
                      @click="destroyProduct(row.item.id)"
                    >
                      DELETE
                    </b-button>
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination
                  align="right"
                  :value="products.current_page"
                  :total-rows="products.total"
                  :per-page="products.per_page"
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
      title: "Products",
    };
  },
  //data function
  data() {
    return {
      //table header
      fields: [
        {
          label: "Nama Produk",
          key: "name",
        },
        {
          label: "Harga",
          key: "price",
        },
        {
          label: "Stok",
          key: "stock",
        },
        {
          label: "Deskripsi",
          key: "description",
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
    await store.dispatch("authenticated/product/getProductsData");
  },

  //computed
  computed: {
    //products
    products() {
      return this.$store.state.authenticated.product.products;
    },
  },

  //method
  methods: {
    //method "searchData"
    searchData() {
      //commit to mutation "SET_PAGE"
      this.$store.commit("authenticated/product/SET_PAGE", 1);
      //dispatch on action "getProductsData"
      this.$store.dispatch(
        "authenticated/product/getProductsData",
        this.search
      );
    },

    //method "changePage"
    changePage(page) {
      //commit to mutation "SET_PAGE"
      this.$store.commit("authenticated/product/SET_PAGE", page);
      //dispatch on action "getProductsData"
      this.$store.dispatch(
        "authenticated/product/getProductsData",
        this.search
      );
    },

    //method "destroyProduct"
    destroyProduct(id) {
      this.$swal
        .fire({
          title: "APAKAH ANDA YAKIN ?",
          text: "INGIN MENGHAPUS DATA INI !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "YA, HAPUS!",
          cancelButtonText: "TIDAK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            //dispatch to action "deleteProduct" vuex
            this.$store
              .dispatch("authenticated/product/destroyProduct", id)
              .then(() => {
                //feresh data
                this.$nuxt.refresh();
                //alert
                this.$swal.fire({
                  title: "BERHASIL!",
                  text: "Data Berhasil Dihapus!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
              });
          }
        });
    },
  },
};
</script>
<style></style>
