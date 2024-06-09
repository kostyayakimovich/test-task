<template>
  <main class="images">
    <h1>Images</h1>
    <div v-if="fileImages.length" class="img-container">
      <img v-for="{ src, id } in fileImages" :src="src" :key="id" />
    </div>
    <h3 v-else>{{ NO_CONTENT }}</h3>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFileStore } from '@/stores/file'
import { NO_CONTENT } from '@/constants'

const fileStore = useFileStore()
const { fileImages } = storeToRefs(fileStore)
</script>

<style scoped>
.images {
  display: grid;
  place-items: center;
  padding: 32px;

  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    img {
      width: 300px;
      height: 300px;
    }
  }
}
</style>
