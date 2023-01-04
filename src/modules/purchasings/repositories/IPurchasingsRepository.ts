
import { ICreatePurchasingsDTO, IPurchasingsPagination } from "../dots/IPurchasingsDTO";
import { Purchasings } from "../infra/typeorm/entities/Purchasings";

interface IPurchasingsRepository {
    findById(id: number): Promise<Purchasings>;
    findByPurchasingNameSearch(status: string): Promise<(Purchasings | undefined)[] | undefined>;
    findAllPurchasingsWithoutPagination(): Promise<Purchasings[]>;
    findAllPaginatedPurchasings(page: number): Promise<IPurchasingsPagination>;
    findAllPurchasings(): Promise<Purchasings[]>;
    create(data: ICreatePurchasingsDTO): Promise<Purchasings>;
    update(data: Purchasings): Promise<Purchasings>;
    delete(id: number): Promise<void>;
}

export { IPurchasingsRepository }