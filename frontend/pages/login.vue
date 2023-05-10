<template>
  <div class="fade-in">
    <div class="text-center mb-4">
      <h3 class="mt-2 font-weight-bold text-black">Fullstack Test</h3>
    </div>
    <div class="card-group">
      <div class="card border-top-orange border-0 shadow-sm rounded">
        <div class="card-body">
          <h1>Login</h1>
          <p class="text-muted">Sign In to your account</p>
          <div v-if="validation.message" class="mt-2">
            <b-alert show variant="danger">{{ validation.message }}</b-alert>
          </div>
          <form @submit.prevent="login">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                class="form-control"
                v-model="user.username"
                :class="{
                  'is-invalid': validation.username,
                }"
                type="text"
                placeholder="Username"
              />
            </div>
            <div v-if="validation.username" class="mt-2">
              <b-alert show variant="danger">{{
                validation.username[0]
              }}</b-alert>
            </div>
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                class="form-control"
                v-model="user.password"
                :class="{ 'is-invalid': validation.password }"
                type="password"
                placeholder="Password"
              />
            </div>
            <div v-if="validation.password" class="mt-2">
              <b-alert show variant="danger">{{
                validation.password[0]
              }}</b-alert>
            </div>
            <div class="row">
              <div class="col-12">
                <button
                  class="btn btn-warning shadow-sm rounded-sm px-4 w-100"
                  type="submit"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
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
      title: "Login",
    };
  },
  data() {
    return {
      //state user
      user: {
        username: "",
        password: "",
      },
      //validation
      validation: [],
    };
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith("authenticated", {
          data: {
            username: this.user.username,
            password: this.user.password,
          },
        })
        .then(() => {
          //redirect
          this.$router.push({
            name: "authenticated-dashboard",
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
