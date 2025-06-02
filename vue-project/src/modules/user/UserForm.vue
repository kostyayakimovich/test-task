<template>
  <main class="user-form">
    <h1>User Form</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <label>
        Name:
        <input v-model="user.name" type="text" required />
      </label>

      <label>
        Username:
        <input v-model="user.username" type="text" required />
      </label>

      <label>
        Email:
        <input v-model="user.email" type="email" required />
      </label>

      <label>
        Phone:
        <input v-model="user.phone" type="text" required />
      </label>

      <label>
        Website:
        <input v-model="user.website" type="url" required />
      </label>

      <button type="submit">Add User</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/stores/users'
import type { User } from '@/models'

const user = reactive<User>({
  id: Date.now(),
  name: '',
  username: '',
  email: '',
  phone: '',
  website: ''
})

const userStore = useUserStore()
const { addNewUser } = userStore

const handleSubmit = () => {
  user.id = Date.now()
  addNewUser(user)
}
</script>

<style scoped>
.user-form {
  display: grid;
  place-items: center;
  width: 100%;
  padding: 32px;
}

.form {
  display: grid;
  gap: 16px;
  width: 300px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
