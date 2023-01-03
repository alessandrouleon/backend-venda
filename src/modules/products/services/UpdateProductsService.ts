import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateProductsDTO } from "../dtos/IProductsDTO";
import { Products } from "../infra/typeorm/entities/Products";
import { IProductsRepository } from "../respositories/IProductsRepository";


@injectable()
class UpdateProductsService {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }

    async execute({ id, ...rest }: IUpdateProductsDTO): Promise<Products> {
        const product = await this.productsRepository.findByProductId(id);

        if (!product) {
            throw new AppError("Produts does not exists!", 404);
        }

        Object.assign(product, {
            ...rest
        });
        
        return await this.productsRepository.update(product);
    }

}

export { UpdateProductsService }