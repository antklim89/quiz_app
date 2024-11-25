<template>
  <header class="container flex justify-between items-center h-12">
    <NuxtLink class="flex items-center space-x-4 text-2xl font-bold text-purple-600 hover:text-purple-600 hover:no-underline" to="/">
      <NuxtImg src="/favicon.svg" class="size-8" />
      <span>Quiz App</span>
    </NuxtLink>
    <nav class="">
      <ul class="flex gap-4">
        <li>
          <NuxtLink class="link" to="/">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/about">
            About
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
