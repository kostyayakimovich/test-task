<template>
  <main class="home">
    <h1>Home</h1>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/posts'

const isChanging = ref<boolean>(false)

const postStore = usePostStore()
// const { posts } = postStore
const { posts } = storeToRefs(postStore)

watch([isChanging, posts], (value) => {
  if (value) console.log(value)
})
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 32px;

  p {
    margin: 0;
    padding: 0;
    word-wrap: break-word;
  }
}
</style>
