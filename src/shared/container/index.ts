import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IProductsRepository } from "@modules/products/respositories/IProductsRepository";
import { PurchasingsRepository } from "@modules/purchasings/infra/typeorm/repositories/PurchasingsRepository";
import { IPurchasingsRepository } from "@modules/purchasings/repositories/IPurchasingsRepository";
import { container } from "tsyringe";


container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository
);

container.registerSingleton<IPurchasingsRepository>(
    'PurchasingsRepository',
    PurchasingsRepository
);