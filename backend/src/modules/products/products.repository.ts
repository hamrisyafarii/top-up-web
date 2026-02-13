import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly database: DatabaseService) {}

  findAllProducts() {
    return this.database.product.findMany();
  }
}
