<template>
  <ul class="c-sidebar-nav">
    <li class="c-sidebar-nav-item">
      <nuxt-link
        :to="{ name: 'authenticated-dashboard' }"
        class="c-sidebar-nav-link"
        href="index.html"
      >
        <svg class="c-sidebar-nav-icon">
          <use
            xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"
          ></use>
        </svg>
        Dashboard
      </nuxt-link>
    </li>
    <li class="c-sidebar-nav-title">MASTER DATA</li>
    <li class="c-sidebar-nav-item">
      <nuxt-link
        :to="{ name: 'authenticated-products' }"
        class="c-sidebar-nav-link"
      >
        <svg class="c-sidebar-nav-icon">
          <use
            xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-folder"
          ></use>
        </svg>
        Products
      </nuxt-link>
    </li>
    <li class="c-sidebar-nav-title">ORDERS</li>
    <li class="c-sidebar-nav-item">
      <nuxt-link
        :to="{ name: 'authenticated-transactions' }"
        class="c-sidebar-nav-link"
      >
        <svg class="c-sidebar-nav-icon">
          <use
            xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cart"
          ></use>
        </svg>
        Transactions
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {};
</script>
<style scoped>
a.nuxt-link-active {
  background: rgba(255, 255, 255, 0.05) !important;
}
</style>
