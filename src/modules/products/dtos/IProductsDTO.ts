import { Products } from "../infra/typeorm/entities/Products";


interface ICreateProductsDTO {
    name: string;
    description: string;
    price: number;
}

interface IUpdateProductsDTO extends ICreateProductsDTO {
    id: number;
}

interface IProductsPagination {
    product: Products[];
    totalProducts: number;
    totalPages: number;
}



export { ICreateProductsDTO, IProductsPagination, IUpdateProductsDTO }