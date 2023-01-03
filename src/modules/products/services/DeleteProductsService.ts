import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Products } from "../infra/typeorm/entities/Products";
import { IProductsRepository } from "../respositories/IProductsRepository";


@injectable()
class DeleteProductsServise {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }

    async execute(id: number): Promise<Products> {
        const checkExistProduct = await this.productsRepository.findByProductId(id);

        if (!checkExistProduct) {
            throw new AppError("This products does not exists for delete!", 404);
        }
        await this.productsRepository.delete(id);

        return checkExistProduct;
    }
}

export { DeleteProductsServise }