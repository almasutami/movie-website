<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: null,
  },
  buttonStyle: {
    type: String,
    default: 'primary',
  },
  icon: {
    type: String,
    default: null,
  },
  iconPosition: {
    type: Boolean,
    default: null,
  },
})

const buttonVariant = computed(() => {
  switch (props.buttonStyle) {
    case 'primary':
      return 'solid'
    case 'secondary':
      return 'outline'
    case 'link':
      return 'ghost'
  }
})

const buttonColor = computed(() => {
  switch (props.buttonStyle) {
    case 'primary':
      return 'black'
    case 'secondary':
      return 'white'
    case 'link':
      return 'black'
  }
})
</script>

<template>
  <u-button
    :size="props?.size"
    :disabled="props?.disabled"
    :loading="props?.loading"
    :label="props?.label"
    :icon="props?.icon"
    :trailing="iconPosition"
    :variant="buttonVariant"
    :color="buttonColor"
  />
</template>
