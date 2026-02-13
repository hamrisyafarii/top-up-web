import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ApiResponse } from 'src/common/interfaces/response.interfce';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}

  async getAllProducts(): Promise<ApiResponse> {
    const products = await this.productsRepo.findAllProducts();

    return {
      statusCode: 200,
      message: `Successfullt get all products`,
      data: products,
    };
  }
}
