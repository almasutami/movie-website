<script setup lang="ts">
import logoDarkBg from '@/assets/icons-and-logos/logo-dark-bg.png'
import BaseButton from 'components/base-button.vue'

const isScrolled = ref(false)

const handleScroll = () => {
  const scrollPosition = window.scrollY
  isScrolled.value = scrollPosition > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

interface TabItem {
  label: string
  to: string
  icon: string
}

const tabItems = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home',
  },
  {
    label: 'Movies',
    to: '/movies',
    icon: 'i-heroicons-film',
  },
  {
    label: 'TV Series',
    to: '/tv-series',
    icon: 'i-heroicons-tv',
  },
] as TabItem[]
</script>

<template>
  <nav
    :class="{
      'bg-[rgba(30,30,30,1)]': isScrolled,
      'bg-transparent': !isScrolled,
    }"
    class="text-white w-full fixed top-0 z-10"
  >
    <div class="max-w-screen mx-auto pr-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-6 h-16">
          <div class="flex-shrink-0">
            <img :src="logoDarkBg" class="h-16" />
          </div>

          <div class="hidden md:block">
            <div class="ml-4 flex space-x-6 text-gray-300">
              <nuxt-link
                v-for="tab in tabItems"
                :key="tab.label"
                :to="tab.to"
                class="hover:cursor-pointer"
                exact-active-class=" text-base font-semibold text-white"
              >
                <div class="flex flex-row gap-2 items-center">
                  <u-icon :name="tab?.icon" />
                  <div class="hover:text-gray-300">{{ tab.label }}</div>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div>
          <ul class="ml-4 flex space-x-4">
            <nuxt-link to="/search">
              <base-button
                size="sm"
                button-style="link"
                icon="i-heroicons-magnifying-glass"
              />
            </nuxt-link>
            <base-button button-style="secondary" size="sm" label="Login" />
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
