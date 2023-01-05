
import { ICreateProductsDTO, IProductsPagination } from "../dtos/IProductsDTO";
import { Products } from "../infra/typeorm/entities/Products";

interface IProductsRepository {
    findByProductId(id: number): Promise<Products | undefined>;
    findByProductName(name: string): Promise<Products | undefined>;
    findByProductNameSearch(description: string): Promise<(Products | undefined)[] | undefined>;
    findAllPaginatedProducts(page: number): Promise<IProductsPagination>;
    create(data: ICreateProductsDTO): Promise<Products>;
    update(data: Products): Promise<Products>;
    delete(id: number): Promise<void>;
}

export { IProductsRepository }