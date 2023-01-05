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

    public async findAllPurchasingsWithoutPagination(): Promise<Purchasings[]> {
        throw new Error("Method not implemented.");
    }
    public async findAllPaginatedPurchasings(page: number): Promise<IPurchasingsPagination> {
        throw new Error("Method not implemented.");
    }
    public async findAllPurchasings(): Promise<Purchasings[]> {
        throw new Error("Method not implemented.");
    }

    public async create(data: ICreatePurchasingsDTO): Promise<Purchasings> {
      const purchasing = this.ormRepository.create(data);      
      return await this.ormRepository.save(purchasing);
    }

    public async update(data: Purchasings): Promise<Purchasings> {
        throw new Error("Method not implemented.");
    }
    public async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { PurchasingsRepository }