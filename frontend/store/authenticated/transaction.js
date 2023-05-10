//state
export const state = () => ({
  //transactions
  transactions: [],

  //page
  page: 1,

  //transaction
  transaction: {},
});

//mutations
export const mutations = {
  //mutation "SET_TRANSACTIONS_DATA"
  SET_TRANSACTIONS_DATA(state, payload) {
    //set value state "transactions"
    state.transactions = payload;
  },

  //mutation "SET_PAGE"
  SET_PAGE(state, payload) {
    //set value state "page"
    state.page = payload;
  },

  //mutation "SET_TRANSACTION_DATA"
  SET_TRANSACTION_DATA(state, payload) {
    //set value state "transaction"
    state.transaction = payload;
  },
};

//actions
export const actions = {
  //get transactions data
  getTransactionsData({ commit, state }, payload) {
    //search
    let search = payload ? payload : "";

    //set promise
    return new Promise((resolve, reject) => {
      //fetching Rest API "/api/transactions" with method "GET";
      this.$axios
        .get(`/api/transactions?q=${search}&page=${state.page}`)
        //success
        .then((response) => {
          //commit ti mutation "SET_TRANSACTIONS_DATA"
          commit("SET_TRANSACTIONS_DATA", response.data.data);
          //resolve promise
          resolve();
        });
    });
  },

  //store transaction
  storeTransaction({ dispatch, commit }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //store to Rest API "/api/transactions" with method "POST"
      this.$axios
        .post("/api/transactions", payload)
        //success
        .then(() => {
          //dispatch action "getTransactionsData"
          dispatch("getTransactionsData");
          //resolve promise
          resolve();
        })
        //error
        .catch((error) => {
          reject(error);
        });
    });
  },

  //get detail transaction
  getDetailTransaction({ commit }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //get to Rest API "/api/transactions/:id" with method "GET";
      this.$axios
        .get(`/api/transactions/${payload}`)
        //success
        .then((response) => {
          //commit to mutation "SET_TRANSACTION_DATA"
          commit("SET_TRANSACTION_DATA", response.data.data);
          //resolve promise
          resolve();
        });
    });
  },
};
