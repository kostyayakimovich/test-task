<script setup lang="ts">
import { provide } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

provide('userName', 'Tolik')
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
        <RouterLink to="/users">Users</RouterLink>
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
