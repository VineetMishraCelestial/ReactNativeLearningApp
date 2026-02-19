import { apiClient } from './apiClient';
import { ProductsResponse } from '../models/Products';


class ProductService {
  getProducts(): Promise<ProductsResponse> {
    return apiClient.get<ProductsResponse>('/products');
  }
}

export const productService = new ProductService();