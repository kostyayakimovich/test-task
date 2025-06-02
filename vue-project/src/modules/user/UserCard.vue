<template>
  <div class="user-card">
    <slot name="card" />
    <h3>User Card</h3>
    <input v-model="localFirst" placeholder="First Name" />
    <input
      :value="lastName"
      @input="emitLastNameChange(($event.target as HTMLInputElement).value)"
      placeholder="Last Name"
    />

    <slot name="card1" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps<{
  modelValueFirst: string
  lastName: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValueFirst', value: string): void
  (e: 'lastName', value: string): void
}>()

const localFirst = ref(props.modelValueFirst)

const emitLastNameChange = (value: string) => {
  emit('lastName', value)
}

watch(localFirst, (val) => {
  emit('update:modelValueFirst', val)
})

watch(
  () => props.modelValueFirst,
  (val) => {
    localFirst.value = val
  }
)
</script>
