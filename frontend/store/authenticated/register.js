//actions
export const actions = {
  //store register
  storeRegister({ commit }, payload) {
    //set promise
    return new Promise((resolve, reject) => {
      //store to Rest API "/api/register" with method "POST";
      this.$axios
        .post("/api/register", payload)
        //success
        .then(() => {
          //resolve promise
          resolve();
        })
        //error
        .catch((error) => {
          reject(error);
        });
    });
  },
};
