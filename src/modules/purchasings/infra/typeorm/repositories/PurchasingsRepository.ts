import { IPurchasingsPagination, ICreatePurchasingsDTO } from "@modules/purchasings/dots/IPurchasingsDTO";
import { IPurchasingsRepository } from "@modules/purchasings/repositories/IPurchasingsRepository";
import { getRepository, Like, Repository } from "typeorm";
import { Purchasings } from "../entities/Purchasings";

const totalPerPage = 5;

class PurchasingsRepository implements IPurchasingsRepository {

    private ormRepository: Repository<Purchasings>;

    constructor() {
        this.ormRepository = getRepository(Purchasings);
    }

    public async findById(id: number): Promise<Purchasings | undefined> {
        return await this.ormRepository.findOne(id);
    }

    public async findByPurchasingNameSearch(status: string): Promise<(Purchasings | undefined)[] | undefined> {
        const purchasing = await this.ormRepository.find({
            where: { status: Like(`${status}%`) },
            take: totalPerPage,
            order: { id: 'DESC' }
        });
        return purchasing;
    }


    public async findAllPaginatedPurchasings(page = 1): Promise<IPurchasingsPagination> {
        const purchasing = await this.ormRepository.find({
            order: { id: 'DESC' },
            skip: (page - 1) * totalPerPage,
            take: totalPerPage
        });

        const totalPurchasings = (await this.ormRepository.find()).length;

        return {
            purchasing,
            totalPurchasings,
            totalPages: totalPurchasings / totalPerPage
        }
    }


    public async create(data: ICreatePurchasingsDTO): Promise<Purchasings> {
        const purchasing = this.ormRepository.create(data);
        return await this.ormRepository.save(purchasing);
    }

    public async update(data: Purchasings): Promise<Purchasings> {
        return await this.ormRepository.save(data);
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete({ id });
    }

}

export { PurchasingsRepository }