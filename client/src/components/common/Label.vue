<template>
  <label :for="forId" class="label">{{ text }}</label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LabelComponent',
  props: {
    text: {
      type: String,
      required: true
    },
    forId: {
      type: String,
      required: true
    }
  }
});
</script>
