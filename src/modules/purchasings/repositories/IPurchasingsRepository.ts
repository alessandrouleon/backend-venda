
import { ICreatePurchasingsDTO, IPurchasingsPagination } from "../dots/IPurchasingsDTO";
import { Purchasings } from "../infra/typeorm/entities/Purchasings";

interface IPurchasingsRepository {
    findById(id: number): Promise<Purchasings | undefined>;
    findByPurchasingNameSearch(status: string): Promise<(Purchasings | undefined)[] | undefined>;
    findAllPaginatedPurchasings(page: number): Promise<IPurchasingsPagination>;
    create(data: ICreatePurchasingsDTO): Promise<Purchasings>;
    update(data: Purchasings): Promise<Purchasings>;
    delete(id: number): Promise<void>;
}

export { IPurchasingsRepository }