<template>
  <main class="home">
    <h1>Home</h1>
    <p>Bonus 1: Which problem can occur if the content of the MDAT box is very large?</p>
    <p>
      Answer: It leads to performance problems, high memory usage and cause the browser or
      application to freeze or crash.
    </p>
    <p>
      Breaking large files into smaller “chunks” allows the browser to process data bit by bit,
      avoiding overload.
    </p>
  </main>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFileStore } from '@/stores/file'
import { getTypeStringData } from '@/utils'

const fileStore = useFileStore()
const { setArrayBufferData } = fileStore
const { boxData, mdatTypeData, fileTypesData, fileImages } = storeToRefs(fileStore)

onMounted(() => {
  if (!mdatTypeData.value && !fileTypesData.value.length && !fileImages.value.length)
    setArrayBufferData()
})

watch(
  () => boxData.value,
  ({ fileTypesData, mdatTypeData }) => {
    if (fileTypesData.length) fileTypesData.forEach((item) => console.log(getTypeStringData(item)))
    if (mdatTypeData) console.log(mdatTypeData)
  },
  { immediate: true, deep: true }
)
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
