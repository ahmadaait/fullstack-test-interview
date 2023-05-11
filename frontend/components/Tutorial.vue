<!-- Please remove this file from your project -->
<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
  >
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <h1 class="text-2xl leading-7 font-semibold">Fullstack Developer Test</h1>
      <div class="row">
        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center justify-content-center">
            <nuxt-link
              :to="{ name: 'login' }"
              class="btn btn-primary mx-1 font-weight-bold"
            >
              LOGIN
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'register' }"
              class="btn btn-primary mx-1 font-weight-bold"
            >
              REGISTER
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>
