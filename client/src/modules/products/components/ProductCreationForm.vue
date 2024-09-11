<template>
  <div class="product-creation-form">
    <h2>Create New Product</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <InputComponent
          id="product-name"
          v-model="form.name"
          label="Name"
          required
        />
      </div>
      <div class="form-group">
        <InputComponent
          id="product-description"
          v-model="form.description"
          label="Description"
        />
      </div>
      <div class="form-group">
        <InputComponent
          id="product-price"
          type="number"
          v-model="form.price"
          label="Price"
        />
      </div>
      <div class="form-group">
        <InputComponent
          id="product-location"
          v-model="form.location"
          label="Location"
          required
        />
      </div>
      <div class="form-group">
        <InputComponent
          id="product-start-date"
          type="date"
          v-model="form.startDate"
          label="Start Date"
          required
        />
      </div>
      <div class="form-group">
        <InputComponent
          id="product-end-date"
          type="date"
          v-model="form.endDate"
          label="End Date"
          required
        />
      </div>
      <div class="form-group">
        <SelectComponent
          id="product-category"
          v-model="form.category"
          :options="categoryOptions"
          label="Category"
          required
        />
      </div>
      <div class="form-group">
        <SelectComponent
          id="product-status"
          v-model="form.status"
          :options="statusOptions"
          label="Status"
          required
        />
      </div>
      <ButtonComponent class="submit-button" size="medium" type="primary">
        Create Product
      </ButtonComponent>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { Category, ProductStatus } from '../types';
import ButtonComponent from '../../../components/common/Button.vue';
import InputComponent from '../../../components/common/Input.vue';
import SelectComponent from '../../../components/common/Select.vue';

export default defineComponent({
  name: 'ProductCreationForm',
  components: {
    ButtonComponent,
    InputComponent,
    SelectComponent
  },
  setup() {
    const store = useStore();
    const form = ref({
      name: '',
      description: '',
      price: 0,
      location: '',
      category: Category.FLIGHT,
      startDate: '',
      endDate: '',
      status: ProductStatus.AVAILABLE
    });

    const successMessage = ref('');
    const errorMessage = ref('');

    const submitForm = async () => {
      const productData = {
        ...form.value,
        startDate: new Date(form.value.startDate).toISOString(),
        endDate: new Date(form.value.endDate).toISOString()
      };

      try {
        await store.dispatch('products/createProduct', productData);
        successMessage.value = 'Product created successfully!';
        errorMessage.value = '';

        form.value = {
          name: '',
          description: '',
          price: 0,
          location: '',
          category: Category.FLIGHT,
          startDate: '',
          endDate: '',
          status: ProductStatus.AVAILABLE
        };
      } catch (error) {
        errorMessage.value = 'Error creating product. Please try again.';
        console.error('Error creating product:', error);
      } finally {
        setTimeout(() => {
          successMessage.value = '';
        }, 5000);
      }
    };

    const categoryOptions = [
      { text: 'Flight', value: Category.FLIGHT },
      { text: 'Hotel', value: Category.HOTEL },
      { text: 'Car Rental', value: Category.CAR_RENTAL },
      { text: 'Bundle', value: Category.BUNDLE }
    ];

    const statusOptions = [
      { text: 'Available', value: ProductStatus.AVAILABLE },
      { text: 'Unavailable', value: ProductStatus.UNAVAILABLE }
    ];

    return {
      form,
      categoryOptions,
      statusOptions,
      submitForm,
      successMessage,
      errorMessage
    };
  }
});
</script>

<style scoped>
.product-creation-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 1rem;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.submit-button {
  width: 100%;
  margin-top: 1rem;
}
</style>
