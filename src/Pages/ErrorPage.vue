<template>
    <div
      class="flex items-center justify-center bg-[url('../assets/images/login-bg.png')] h-screen bg-cover"
    >
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          &#128531;Oops! Page not found.
        </h1>
        <p class="text-xl md:text-2xl text-white mb-8">
          Looks like you're lost in space.
        </p>
        <router-link
          to="/"
          class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >Back to Landing Page</router-link
        >
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped></style>