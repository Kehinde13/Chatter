<template>
    <header class="border-b border-black sticky top-0 z-50 transition-all duration-500"
            :class="[scrollNav === true ? 'bg-white' : 'bg-banner']">
        <div class="size h-[70px] flex items-center justify-between">
            <router-link to="/" class="flex gap-1 text-xl font-bold">
                <font-awesome-icon icon="fa-solid fa-globe" class="text-2xl" />
                <p>Chatter</p>
            </router-link>

            <div class="flex items-center gap-5">
                <div class="hidden sm:flex items-center gap-5">
                    <router-link to="/">
                        Our Story
                    </router-link>
                    <router-link to="/">
                        Membership
                    </router-link>
                    <router-link to="/">
                        Write
                    </router-link>
                    <button>
                        Sign In
                    </button>
                </div>

                <button class="text-white rounded-full px-3 p-2 text-sm font-bold transition-all duration-500"
                        :class="[scrollNav === true ? 'bg-green-800' : 'bg-black']">
                    Get Started
                </button>

                <div>

                </div>

            </div>
        </div>

    </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const scrollNav = ref<Boolean>(false)

onMounted(() => {
   const scrolled = () => {
    window.scrollY > 50 ? scrollNav.value = true : scrollNav.value = false
   }
   window.addEventListener("scroll", scrolled) 
})
</script>

<style></style>