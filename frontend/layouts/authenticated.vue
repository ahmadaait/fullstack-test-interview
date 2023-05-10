<template>
  <div class="c-app">
    <div
      class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show"
      id="sidebar"
    >
      <div class="c-sidebar-brand d-lg-down-none">
        <span class="font-weight-bold">FULLSTACK TEST</span>
      </div>
      <!-- sidebar -->
      <Sidebar />
      <!-- end sidebar -->
    </div>
    <div class="c-wrapper c-fixed-components">
      <!-- Header -->
      <Header />
      <!-- end Header -->
      <div class="c-body">
        <!-- content -->
        <Nuxt />
        <!-- end content -->
        <footer class="c-footer">
          <div class="ml-auto">
            Template by&nbsp;<a href="https://coreui.io/">CoreUI</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/authenticated/Header.vue";
import Sidebar from "@/components/authenticated/Sidebar.vue";
export default {
  //middleware
  middleware: "isAuthenticated",
  //register components
  components: {
    Header,
    Sidebar,
  },
};
</script>
<style></style>
