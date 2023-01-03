import { ICreateProductsDTO, IProductsPagination } from "@modules/products/dtos/IProductsDTO";
import { IProductsRepository } from "@modules/products/respositories/IProductsRepository";
import { getRepository, Like, Repository } from "typeorm";
import { Products } from "../entities/Products";


const totalPerPage = 5;

class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Products>;

    constructor() {
        this.ormRepository = getRepository(Products);
    }

    public async findByProductId(id: number): Promise<Products | undefined> {
        return await this.ormRepository.findOne({ id });
    }

    public async findByProductName(name: string): Promise<Products | undefined> {
        return await this.ormRepository.findOne({
            where: { name },
            withDeleted: false
        });
    }


    public async findByProductNameSearch(description: string): Promise<(Products | undefined)[] | undefined> {
        const product = await this.ormRepository.find({
            where: { description: Like(`${description}%`) },
            take: totalPerPage,
            order: { id: 'DESC' }
        });
        return product;
    }

    public async findAllProductsWithoutPagination(): Promise<Products[]> {
        return await this.ormRepository.find();
    }

    public async findAllPaginatedProducts(page = 1): Promise<IProductsPagination> {
        const product = await this.ormRepository.find({
            order: { id: 'DESC' },
            skip: (page - 1) * totalPerPage,
            take: totalPerPage,
        });

        const totalProducts = (await this.ormRepository.find()).length;

        return {
            product,
            totalProducts,
            totalPages: totalProducts / totalPerPage,
        }
    }

    public async findAllProducts(): Promise<Products[]> {
        return await this.ormRepository.find({
            order: { id: 'DESC' }
        });
    }

    public async create(data: ICreateProductsDTO): Promise<Products> {
        const product = this.ormRepository.create(data);
        return await this.ormRepository.save(product);
    }

    public async update(data: Products): Promise<Products> {
        return await this.ormRepository.save(data);
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete({ id });
    }

}

export { ProductsRepository }