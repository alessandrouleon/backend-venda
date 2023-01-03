import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateProductsDTO } from "../dtos/IProductsDTO";
import { Products } from "../infra/typeorm/entities/Products";
import { IProductsRepository } from "../respositories/IProductsRepository";


@injectable()
class CreateProductsService {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }

    async execute(data: ICreateProductsDTO): Promise<Products> {
        const checkExistName = await this.productsRepository.findByProductName(data.name);
       
        if (checkExistName) {
            throw new AppError("This products already exists!", 404);
        }

        return await this.productsRepository.create(data);
    }

}

export { CreateProductsService }