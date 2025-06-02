<template>
  <main class="user-data">
    <h1 class="className">User Data</h1>
    <p v-if="userName">Hello, {{ userName }}!</p>
    <p>hello from inject, {{ injectName }}</p>

    <UserCard
      v-model:modelValueFirst="firstName"
      :lastName="lastName"
      @update:lastName="lastName = $event"
    >
      <template #card>
        <div>I am slot 1</div>
      </template>
      <template #card1>
        <div>I am slot 2</div>
      </template>
    </UserCard>

    <p>Full Name: {{ fullName }}</p>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, inject } from 'vue'
import UserCard from './UserCard.vue'

const injectName = inject<string>('userName', 'Default Name')

defineProps({
  userName: {
    type: String,
    default: 'No Name'
  }
})

const firstName = ref('')
const lastName = ref('')

const fullName = computed(() => `${firstName.value} ${lastName.value}`)
</script>

<style scoped>
.user-data {
  display: grid;
  place-items: center;
  width: 100%;
  padding: 32px;
}
</style>
