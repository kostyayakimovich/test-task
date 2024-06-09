<template>
  <main class="file-types">
    <h1>Other Types</h1>
    <section v-if="fileTypesData.length">
      <p v-for="(item, index) in fileTypesData" :key="index">
        {{ getTypeStringData(item) }}
      </p>
    </section>
    <h3 v-else>{{ NO_CONTENT }}</h3>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFileStore } from '@/stores/file'
import { NO_CONTENT } from '@/constants'
import { getTypeStringData } from '@/utils'

const fileStore = useFileStore()
const { fileTypesData } = storeToRefs(fileStore)
</script>

<style scoped>
.file-types {
  display: grid;
  place-items: center;
  width: 100%;
  padding: 32px;

  p {
    margin: 0;
    padding: 0;
    word-break: break-all;
  }
}
</style>
