<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header text-center">
                <span class="font-weight-bold"
                  ><i class="fa fa-tachometer-alt"></i> DASHBOARD</span
                >
              </div>
              <div class="card-body">
                <div class="text-center">
                  <h1>SELAMAT DATANG DI HALAMAN DASHBOARD</h1>
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
      title: "Dashboard",
    };
  },
};
</script>
<style></style>
