import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Thay đổi địa chỉ tùy thuộc vào backend của bạn

const productService = {
  // Lấy danh sách sản phẩm
  getProducts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllProducts`);
      return response.data;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },
  // Lấy danh sách sản phẩm
  getProductById: async (idProduct) => {
    try {
      const response = await axios.get(`${BASE_URL}/getProductbyId/${idProduct}`);
      return response.data;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Thêm sản phẩm mới
  addProduct: async (productData) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-product`, productData);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-product/${productId}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Cập nhật thông tin sản phẩm
  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-product/${productId}`, productData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
};

export default productService;
