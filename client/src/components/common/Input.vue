<template>
  <div class="input-wrapper">
    <LabelComponent v-if="label" :forId="id" :text="label" />
    <input
      :id="id"
      :type="type"
      :value="inputValue"
      @input="handleInput"
      :required="required"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LabelComponent from './Label.vue';

export default defineComponent({
  name: 'InputComponent',
  components: {
    LabelComponent
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    id: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: this.modelValue
    };
  },
  watch: {
    modelValue(newVal) {
      this.inputValue = newVal;
    }
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        const value = this.type === 'number' ? Number(target.value) : target.value;
        this.$emit('update:modelValue', value);
      }
    }
  }
});
</script>
