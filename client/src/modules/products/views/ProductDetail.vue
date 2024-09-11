<template>
  <div class="product-detail" v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p class="product-price">Price: ${{ product.price }}</p>
    <p class="product-category">Category: {{ product.category }}</p>

    <div class="form-group">
      <InputComponent
        id="customerName"
        v-model="customerName"
        label="Customer Name"
        type="text"
      />
    </div>

    <div class="form-group">
      <InputComponent
        id="quantity"
        v-model="quantity"
        label="Quantity"
        type="number"
        :min="1"
      />
    </div>

    <div class="button-wrapper">
      <ButtonComponent @click="placeOrder" size="medium" type="primary" :disabled="isSubmitting">
        Place Order
      </ButtonComponent>
    </div>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, computed, onMounted
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import InputComponent from '../../../components/common/Input.vue';
import ButtonComponent from '../../../components/common/Button.vue';

export default defineComponent({
  name: 'ProductDetail',
  components: {
    InputComponent,
    ButtonComponent
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const quantity = ref(1);

    const isSubmitting = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    onMounted(() => {
      store.dispatch('products/fetchProductById', route.params.id);
    });

    const product = computed(() => store.getters['products/getProductById'](route.params.id));

    const customerName = computed({
      get() {
        return store.state.orders.customerName;
      },
      set(value: string) {
        store.dispatch('orders/updateCustomerName', value);
      }
    });

    const placeOrder = async () => {
      if (product.value) {
        isSubmitting.value = true;
        successMessage.value = '';
        errorMessage.value = '';

        try {
          await store.dispatch('orders/placeOrder', {
            productId: product.value.id,
            quantity: quantity.value,
            customerName: customerName.value
          });

          successMessage.value = 'Your order has been placed successfully!';

          quantity.value = 1;
          customerName.value = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: Error | any) {
          errorMessage.value = error?.message ?? 'There was an error creating a order.';
        } finally {
          setTimeout(() => {
            successMessage.value = '';
            isSubmitting.value = false;
            router.push('/products');
          }, 3000);
        }
      }
    };

    return {
      product,
      quantity,
      customerName,
      placeOrder,
      isSubmitting,
      successMessage,
      errorMessage
    };
  }
});
</script>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.success-message {
  color: green;
  margin-top: 1rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.product-price, .product-category {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

button {
  width: 100%;
  max-width: 300px;
}

input, select {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  margin-bottom: 1rem;
}

input:focus, select:focus {
  border-color: #007bff;
}

button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .product-detail {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
