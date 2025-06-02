<template>
  <main class="users">
    <h1>Users</h1>

    <div class="tabs">
      <button @click="activeTab = 'form'" :class="{ active: activeTab === 'form' }">
        User Form
      </button>
      <button @click="activeTab = 'data'" :class="{ active: activeTab === 'data' }">
        User Data
      </button>
    </div>

    <keep-alive>
      <component :is="activeComponent" userName="Kanstantsin" />
    </keep-alive>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/users'
import UserForm from '@/modules/user/UserForm.vue'
import UserData from '@/modules/user/UserData.vue'

const activeTab = ref<'form' | 'data'>('form')

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const { setUserData, getUser } = userStore

const activeComponent = computed(() => {
  return activeTab.value === 'form' ? UserForm : UserData
})

watchEffect(() => {
  console.log(getUser(1), 'User')
  setUserData('User')
})

watch(
  () => users.value,
  (newVal, oldVal) => {
    console.log('users changed:', { oldVal, newVal })
  }
)
</script>

<style scoped>
.users {
  display: grid;
  place-items: center;
  width: 100%;
  padding: 32px;
}

.tabs {
  margin-bottom: 16px;
}

.tabs button {
  margin: 0 8px;
  padding: 8px 16px;
  cursor: pointer;
}

.tabs button.active {
  font-weight: bold;
  border-bottom: 2px solid #000;
}
</style>
