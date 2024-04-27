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
  trailing: {
    type: Boolean,
    default: null,
  },
})

const buttonVariant = computed(() => {
  let variant = 'solid'
  switch (props.buttonStyle) {
    case 'primary':
      variant = 'solid'
      break
    case 'secondary':
      variant = 'outline'
      break
    case 'link':
      variant = 'ghost'
      break
  }
  return variant
})

const buttonColor = computed(() => {
  let color = 'gray'
  switch (props.buttonStyle) {
    case 'primary':
      color = 'black'
      break
    case 'secondary':
      color = 'white'
      break
    case 'link':
      color = 'black'
      break
  }
  return color
})
</script>

<template>
  <u-button
    :size="props?.size"
    :disabled="props?.disabled"
    :loading="props?.loading"
    :label="props?.label"
    :icon="props?.icon"
    :trailing="props?.trailing"
    :variant="buttonVariant"
    :color="buttonColor"
  />
</template>
