<script lang="ts" setup>
const ready = true
</script>

<template>
  <div>
    <UNotifications />

    <NuxtLayout v-show="ready">
      <NuxtLoadingIndicator />

      <NuxtPage />
    </NuxtLayout>
  </div>
</template>