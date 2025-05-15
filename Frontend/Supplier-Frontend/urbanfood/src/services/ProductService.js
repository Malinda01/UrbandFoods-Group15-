// src/services/ProductService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/products";

const ProductService = {
  // Get Products by Supplier - Done
  getProductsBySupplier: (supplierId) => {
    console.log(
      `Fetching products for supplier ID: ${supplierId} from: ${API_BASE_URL}/by-supplier/${supplierId}`
    );
    return axios
      .get(`${API_BASE_URL}/by-supplier/${supplierId}`)
      .catch((error) => {
        console.error(
          "Error in getProductsBySupplier API call:",
          error.response?.data || error.message
        );
        throw error;
      });
  },

  getProductById: (productId) => {
    console.log(
      `Fetching product with ID: ${productId} from: ${API_BASE_URL}/${productId}`
    );
    return axios.get(`${API_BASE_URL}/${productId}`).catch((error) => {
      console.error(
        "Error in getProductById API call:",
        error.response?.data || error.message
      );
      throw error;
    });
  },

  // Add Product - done
  createProduct: (product) => {
    console.log("Creating product with payload:", product);
    return axios.post(`${API_BASE_URL}/add`, product).catch((error) => {
      console.error(
        "Error in createProduct API call:",
        error.response?.data || error.message
      );
      if (error.response?.status === 404) {
        console.error(
          "Endpoint not found: Ensure the backend has a POST /products/add endpoint."
        );
      }
      throw error;
    });
  },

  // Update product - not working
  updateProduct: (productId, supplierId, product) => {
    console.log(
      `Updating product with ID: ${productId} and supplier ID: ${supplierId}`,
      product
    );
    return axios
      .put(`${API_BASE_URL}/${productId}/${supplierId}`, product)
      .catch((error) => {
        console.error(
          "Error in updateProduct API call:",
          error.response?.data || error.message
        );
        throw error;
      });
  },

  deleteProduct: (productId) => {
    console.log(
      `Deleting product with ID: ${productId} from: ${API_BASE_URL}/${productId}`
    );
    return axios.delete(`${API_BASE_URL}/${productId}`).catch((error) => {
      console.error(
        "Error in deleteProduct API call:",
        error.response?.data || error.message
      );
      throw error;
    });
  },
};

export default ProductService;
