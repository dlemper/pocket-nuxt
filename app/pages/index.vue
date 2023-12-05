<script setup lang="ts">
const pocketbase = usePocketbase();

const user = pocketbase.authStore.model

function logout() {
  pocketbase.authStore.clear()
  navigateTo('/auth/login')
}
</script>

<template>
  <div class="justify-center content-center flex flex-wrap mt-8">
    <UCard>
      <div class="text-3xl font-medium text-900 mb-3">{{ user?.id ? "Logged In!" : "Not Logged In" }}</div>

      <div class="font-medium text-500 mb-3">{{ user?.email }}</div>

      <div style="height: 250px" class="border-2 border-dashed">
        <pre>{{ user }}</pre>
      </div>

      <UButton label="Logout" icon="i-heroicons-logout" class="w-half mt-3" @click="logout"></UButton>

      <UButton label="Login" icon="i-heroicons-login" class="w-half mt-3 ml-3" @click="navigateTo('/auth/login')"></UButton>
    </UCard>
  </div>
</template>
