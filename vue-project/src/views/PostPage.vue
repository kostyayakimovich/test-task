<template>
  <main class="posts">
    <h1>Posts</h1>
    <div v-if="posts?.length" class="posts-container">
      <p v-for="{ title, id } in posts" :key="id">{{ title }}</p>
    </div>
    <h3 v-else>{{ NO_CONTENT }}</h3>
  </main>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/posts'
import { NO_CONTENT } from '@/constants'

const postStore = usePostStore()
const { posts } = storeToRefs(postStore)
const { setPostData } = postStore

watchEffect(() => {
  setPostData()
})
</script>

<style scoped>
.posts {
  display: grid;
  place-items: center;
  padding: 32px;
}

.posts-container {
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
}
</style>
