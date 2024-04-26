<script setup lang="ts">
import logoDarkBg from 'assets/icons-and-logos/logo-dark-bg.png'
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
            <ul class="ml-4 flex space-x-6">
              <li><a href="#" class="hover:text-gray-300">Home</a></li>
              <li>
                <div class="flex flex-row gap-2 items-center">
                  <u-icon name="i-heroicons-film" /><a
                    href="#"
                    class="hover:text-gray-300"
                    >Movies</a
                  >
                </div>
              </li>
              <li>
                <div class="flex flex-row gap-2 items-center">
                  <u-icon name="i-heroicons-tv" /><a
                    href="#"
                    class="hover:text-gray-300"
                    >TV Shows</a
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <ul class="ml-4 flex space-x-4">
            <base-button
              size="sm"
              buttonStyle="link"
              icon="i-heroicons-magnifying-glass"
            />
            <base-button buttonStyle="secondary" size="sm" label="Login" />
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
