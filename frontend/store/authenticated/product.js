//state
export const state = () => ({
  //products
  products: [],

  //page
  page: 1,

  //product
  product: {},
});

//mutations
export const mutations = {
  //mutation "SET_PRODUCTS_DATA"
  SET_PRODUCTS_DATA(state, payload) {
    //set value state "products"
    state.products = payload;
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {
    //set value state "page"
    state.page = payload;
  },

  //mutation "SET_PRODUCT_DATA"
  SET_PRODUCT_DATA(state, payload) {
    //set value state "product"
    state.product = payload;
  },
};

//actions
export const actions = {
  //get products data
  getProductsData({ commit, state }, payload) {
    //search
    let search = payload ? payload : "";

    //set promise
    return new Promise((resolve, reject) => {
      //fetching Rest API "/api/products" with method "GET";
      this.$axios
        .get(`/api/products?q=${search}&page=${state.page}`)
        //success
        .then((response) => {
          //commit ti mutation "SET_PRODUCTS_DATA"
          commit("SET_PRODUCTS_DATA", response.data.data);
          //resolve promise
          resolve();
        });
    });
  },

  //store product
  storeProduct({ dispatch, commit }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //store to Rest API "/api/products" with method "POST"
      this.$axios
        .post("/api/products", payload)
        //success
        .then(() => {
          //dispatch action "getProductsData"
          dispatch("getProductsData");
          //resolve promise
          resolve();
        })
        //error
        .catch((error) => {
          reject(error);
        });
    });
  },

  //get detail product
  getDetailProduct({ commit }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //get to Rest API "/api/products/:id" with method "GET";
      this.$axios
        .get(`/api/products/${payload}`)
        //success
        .then((response) => {
          //commit to mutation "SET_PRODUCT_DATA"
          commit("SET_PRODUCT_DATA", response.data.data);
          //resolve promise
          resolve();
        });
    });
  },
  //update product
  updateProduct({ dispatch, commit }, { productId, payload }) {
    //set promise
    return new Promise((resolve, reject) => {
      //store to Rest API "/api/products/:id" with method
      "POST";
      this.$axios
        .post(`/api/products/${productId}`, payload)
        //success
        .then(() => {
          //dispatch action "getProductsData"
          dispatch("getProductsData");
          //resolve promise
          resolve();
        })
        //error
        .catch((error) => {
          reject(error);
        });
    });
  },

  //destroy category
  destroyProduct({ dispatch, commit }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //delete to Rest API "/api/products/:id" with method "DELETE"
      this.$axios
        .delete(`/api/products/${payload}`)
        //success
        .then(() => {
          //dispatch action "getProductsData"
          dispatch("getProductsData");
          //resolve promise
          resolve();
        });
    });
  },

  //get list all products
  getListAllProducts({ commit, state }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //fetching Rest API "/api/products" with method "GET"
      this.$axios
        .get("/api/list-products")
        //success
        .then((response) => {
          //commit ti mutation "SET_PRODUCTS_DATA"
          commit("SET_PRODUCTS_DATA", response.data.data);
          //resolve promise
          resolve();
        });
    });
  },
};
