import { ICreateProductsDTO } from "@modules/products/dtos/IProductsDTO";
import { CreateProductsService } from "@modules/products/services/CreateProductsService";
import { DeleteProductsServise } from "@modules/products/services/DeleteProductsService";
import { UpdateProductsService } from "@modules/products/services/UpdateProductsService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProductsRepository } from "../../typeorm/repositories/ProductsRepository";


class ProductsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body as ICreateProductsDTO;

    const createProducts = container.resolve(CreateProductsService);
    const product = await createProducts.execute(data);

    return response.status(201).json(product);
  }


  public async index(request: Request, response: Response): Promise<Response> {
    const productsRepository = new ProductsRepository();

    const { page } = request.query;
    const { product, totalProducts, totalPages } = await productsRepository.findAllPaginatedProducts(Number(page));

    return response.json({
      product,
      totalProducts,
      totalPages
    });
  }


  public async search(request: Request, response: Response): Promise<Response> {
    const { description } = request.query;

    const productsRepository = new ProductsRepository();
    const product = await productsRepository.findByProductNameSearch(String(description));

    if (product?.length === 0) {
      throw new AppError("This products does not exists!", 404);
    }
    return response.json(product);
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;

    const productUpdate = container.resolve(UpdateProductsService);

    const product = await productUpdate.execute({
      id: Number(id),
      ...data
    });

    return response.status(201).json(product);
  }


  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productDelete = container.resolve(DeleteProductsServise);
    await productDelete.execute(Number(id));

    return response.status(200).json();
  }

}

export { ProductsController }