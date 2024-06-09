<template>
  <main class="mdat">
    <h1>MDAT</h1>
    <p v-if="mdatTypeData">
      {{ mdatTypeData }}
    </p>
    <h3 v-else>{{ NO_CONTENT }}</h3>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NO_CONTENT } from '@/constants'
import { useFileStore } from '@/stores/file'

const fileStore = useFileStore()
const { mdatTypeData } = storeToRefs(fileStore)
</script>

<style scoped>
.mdat {
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
