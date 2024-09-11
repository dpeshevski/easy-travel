import { ActionContext } from 'vuex';
import { ApolloCache } from '@apollo/client';
import { GET_PRODUCT_BY_ID, GET_PRODUCTS } from '../../api/apollo/queries/productQueries';
import { CREATE_PRODUCT, DELETE_PRODUCT } from '../../api/apollo/mutations/productMutations';
import apolloClient from '../../api/apollo/client';
import {
  Product, ProductState, Category, ProductStatus, ProductsQueryResult
} from '../../modules/products/types';

const state: ProductState = {
  products: [],
  categories: []
};

const getters = {
  getProductById: (
    productState: ProductState
  ) => (id: string) => productState.products.find((product) => product.id === id),

  formattedCategories: (productState: ProductState): string[] => {
    const categoryDisplayNames: Record<Category, string> = {
      FLIGHT: 'Flight',
      HOTEL: 'Hotel',
      CAR_RENTAL: 'Car Rental',
      BUNDLE: 'Bundle'
    };

    return productState.categories.map((category) => categoryDisplayNames[category] || category);
  },

  getProductsByCategory: (productState: ProductState) => (readableCategory: string) => {
    const categoryReverseMap: Record<string, string> = {
      Flight: 'FLIGHT',
      Hotel: 'HOTEL',
      'Car Rental': 'CAR_RENTAL',
      Bundle: 'BUNDLE'
    };

    const enumCategory = categoryReverseMap[readableCategory] || readableCategory;
    return productState.products.filter((product) => product.category === enumCategory);
  },

  availableProducts: (productState: ProductState) => productState.products.filter(
    (product: Product) => product.status === ProductStatus.AVAILABLE
  ),

  unavailableProducts: (productState: ProductState) => productState.products.filter(
    (product: Product) => product.status === ProductStatus.UNAVAILABLE
  )
};

const mutations = {
  /* eslint-disable no-param-reassign */
  SET_PRODUCTS(productState: ProductState, products: Product[]) {
    productState.products = products;
  },
  SET_PRODUCT_CATEGORIES(productState: ProductState, categories: Category[]) {
    productState.categories = categories;
  },
  SET_PRODUCT(productState: ProductState, product: Product) {
    const index = productState.products.findIndex((item: Product) => item.id === product.id);
    if (index !== -1) {
      productState.products = [
        ...productState.products.slice(0, index),
        product,
        ...productState.products.slice(index + 1)
      ];
    } else {
      productState.products = [...productState.products, product];
    }
  },
  REMOVE_PRODUCT(productState: ProductState, productId: string) {
    productState.products = productState.products.filter(
      (product: Product) => product.id !== productId
    );
  }
};

function updateProductCache(cache: ApolloCache<unknown>, newProduct: Product) {
  try {
    const existingProducts = cache.readQuery<ProductsQueryResult>({
      query: GET_PRODUCTS,
      variables: { status: ProductStatus.AVAILABLE }
    });

    if (existingProducts) {
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          products: [...existingProducts.products, newProduct]
        },
        variables: { status: ProductStatus.AVAILABLE }
      });
    }
  } catch (error) {
    console.error('Failed to update cache with new product:', error);
  }
}

const actions = {
  async fetchProducts(
    { commit }: ActionContext<ProductState, unknown>,
    status: ProductStatus = ProductStatus.AVAILABLE
  ) {
    const response = await apolloClient.query({
      query: GET_PRODUCTS,
      variables: { status }
    });
    commit('SET_PRODUCTS', response.data.products);

    const uniqueCategories = [
      ...new Set(response.data.products.map((product: Product) => product.category))
    ];

    commit('SET_PRODUCT_CATEGORIES', uniqueCategories);
  },

  async fetchProductById({ commit }: ActionContext<ProductState, unknown>, productId: string) {
    const response = await apolloClient.query({
      query: GET_PRODUCT_BY_ID,
      variables: { id: productId }
    });
    commit('SET_PRODUCT', response.data.product);
  },

  async createProduct(
    { commit }: ActionContext<ProductState, unknown>,
    productData: {
      name: string;
      description: string;
      price: number;
      category: string;
      location: string;
      startDate: string;
      endDate: string;
      status: string;
    }
  ) {
    try {
      const startDate = new Date(productData.startDate).toISOString();
      const endDate = new Date(productData.endDate).toISOString();

      const response = await apolloClient.mutate({
        mutation: CREATE_PRODUCT,
        variables: {
          data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            location: productData.location,
            startDate,
            endDate,
            status: productData.status
          }
        },

        update: (cache: ApolloCache<unknown>, { data: { createProduct } }) => {
          updateProductCache(cache, createProduct);
        }
      });

      commit('SET_PRODUCT', response.data.createProduct);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  },

  async deleteProduct(
    { commit }: ActionContext<ProductState, unknown>,
    productId: string
  ) {
    await apolloClient.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id: productId },
      update: (cache: ApolloCache<unknown>) => {
        const existingProducts = cache.readQuery<ProductsQueryResult>({
          query: GET_PRODUCTS,
          variables: { status: ProductStatus.UNAVAILABLE }
        });

        const newProducts = existingProducts?.products.filter(
          (product: Product) => product.id !== productId
        );

        cache.writeQuery({
          query: GET_PRODUCTS,
          data: { products: newProducts },
          variables: { status: ProductStatus.UNAVAILABLE }
        });
      },
      optimisticResponse: {
        deleteProduct: {
          __typename: 'Product',
          id: productId
        }
      }
    });
    commit('REMOVE_PRODUCT', productId);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
