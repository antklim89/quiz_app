<template>
  <Navbar />
  <main class="container">
    <NuxtErrorBoundary>
      <slot />
      <template #error="{ error, clearError }">
        <UiErrorComponent :error="error" :clear-error="clearError" />
      </template>
    </NuxtErrorBoundary>
  </main>
</template>
