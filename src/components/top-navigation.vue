<script setup lang="ts">
import logoDarkBg from '@/assets/icons-and-logos/logo-dark-bg.png'
import iconDarkBg from '@/assets/icons-and-logos/icon-dark-bg.png'

const isScrolled = ref(false)
const router = useRouter()
const movieStore = useMovieStore()
const { searchQuery } = storeToRefs(movieStore)

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
      <div class="blcok md:flex items-center justify-between h-16">
        <div
          class="flex justify-between md:justify-normal items-center gap-6 h-16"
        >
          <div class="flex-shrink-0 hidden md:block">
            <img :src="logoDarkBg" class="h-16" />
          </div>
          <div class="flex-shrink-0 block md:hidden">
            <img :src="iconDarkBg" class="h-16" />
          </div>

          <div class="ml-4 flex space-x-8 text-gray-300 items-center">
            <nuxt-link
              v-for="tab in tabItems"
              :key="tab.label"
              :to="tab.to"
              :data-test-id="`tab-${tab.label}`"
              class="hover:cursor-pointer"
              exact-active-class=" text-base font-semibold text-white"
            >
              <div class="flex-row gap-2 items-center hidden md:flex">
                <u-icon :name="tab?.icon" />
                <div class="hover:text-gray-300 hidden md:block">
                  {{ tab.label }}
                </div>
              </div>

              <div class="flex-row gap-2 items-center flex md:hidden">
                <u-icon :name="tab?.icon" />
              </div>
            </nuxt-link>

            <nuxt-link to="/search" class="md:hidden">
              <base-button
                size="sm"
                button-style="link"
                icon="i-heroicons-magnifying-glass"
              />
            </nuxt-link>
          </div>
        </div>

        <div>
          <ul class="ml-4 flex space-x-4">
            <u-input
              size="xl"
              icon="i-heroicons-magnifying-glass-20-solid"
              variant="none"
              class="w-full hidden md:block"
              :model-value="searchQuery"
              @change="
                (value: string) => {
                  searchQuery = value
                  if (value.length >= 3) {
                    router.push('/search')
                  }
                }
              "
              placeholder="Search by title..."
            ></u-input>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
