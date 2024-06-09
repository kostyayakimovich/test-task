<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/images">Images</RouterLink>
        <RouterLink to="/mdat">Mdat</RouterLink>
        <RouterLink to="/other-types">Other Types</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}
</style>
