<template>
  <button :class="['button', size, type]" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    type: {
      type: String as PropType<'primary' | 'secondary' | 'danger'>,
      default: 'primary'
    }
  },
  emits: ['click'],
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
</script>
