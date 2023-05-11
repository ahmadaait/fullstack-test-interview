<template>
  <div class="fade-in">
    <div class="text-center mb-4">
      <nuxt-link :to="{ name: 'index' }" class="text-decoration-none">
        <h3 class="mt-2 font-weight-bold text-black">Fullstack Test</h3>
      </nuxt-link>
    </div>
    <div class="card-group">
      <div class="card border-top-orange border-0 shadow-sm rounded">
        <div class="card-body">
          <h1>Register</h1>
          <div v-if="validation.message" class="mt-2">
            <b-alert show variant="danger">{{ validation.message }}</b-alert>
          </div>
          <form @submit.prevent="register">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                class="form-control"
                v-model="user.name"
                type="text"
                placeholder="Nama Lengkap"
              />
            </div>
            <div v-if="validation.name" class="mt-2">
              <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                class="form-control"
                v-model="user.username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div v-if="validation.username" class="mt-2">
              <b-alert show variant="danger">{{
                validation.username[0]
              }}</b-alert>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                class="form-control"
                v-model="user.password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div v-if="validation.password" class="mt-2">
              <b-alert show variant="danger">{{
                validation.password[0]
              }}</b-alert>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                class="form-control"
                v-model="user.password_confirmation"
                type="password"
                placeholder="Konfirmasi Password"
              />
            </div>
            <div v-if="validation.password_confirmation" class="mt-2">
              <b-alert show variant="danger">{{
                validation.password_confirmation[0]
              }}</b-alert>
            </div>
            <div class="row">
              <div class="col-12 text-center">
                <button
                  class="btn btn-info shadow-sm rounded-sm px-4"
                  type="submit"
                >
                  REGISTER
                </button>
                <button
                  class="btn btn-warning shadow-sm rounded-sm px-4"
                  type="reset"
                >
                  RESET
                </button>
              </div>
            </div>
          </form>
          <div class="text-center mt-3">
            Sudah punya akun?
            <nuxt-link :to="{ name: 'login' }" class="font-weight-bold">
              Login Disini
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //middleware
  middleware: "authenticated",
  //layout
  layout: "auth",
  //meta
  head() {
    return {
      title: "Register",
    };
  },
  //data function
  data() {
    return {
      //state user
      user: {
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
      },
      //validation
      validation: [],
    };
  },
  //method
  methods: {
    //method "register"
    async register() {
      //dispatch to action "storeRegister"
      await this.$store
        .dispatch("authenticated/register/storeRegister", {
          name: this.user.name,
          username: this.user.username,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        })
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: "REGISTER BERHASIL!",
            text: "Proses Register Berhasil!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          //redirect
          this.$router.push({
            name: "login",
          });
        })
        .catch((error) => {
          //assign validation
          this.validation = error.response.data;
        });
    },
  },
};
</script>
<style></style>
