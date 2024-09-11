<template>
  <div class="select-wrapper">
    <LabelComponent v-if="label" :forId="id" :text="label" />
    <select
      :id="id"
      v-model="selectedValue"
      @change="$emit('update:modelValue', selectedValue)"
      :required="required"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LabelComponent from './Label.vue';

export default defineComponent({
  name: 'SelectComponent',
  components: {
    LabelComponent
  },
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array as PropType<Array<{ text: string; value: string | number }>>,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedValue: this.modelValue
    };
  },
  watch: {
    modelValue(newVal) {
      this.selectedValue = newVal;
    }
  }
});
</script>
