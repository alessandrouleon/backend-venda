import { inject, injectable } from "tsyringe";
import { ICreatePurchasingsDTO } from "../dots/IPurchasingsDTO";
import { Purchasings } from "../infra/typeorm/entities/Purchasings";
import { IPurchasingsRepository } from "../repositories/IPurchasingsRepository";


@injectable()
class CreatePurchasingsService {

    constructor(
        @inject("PurchasingsRepository")
        private purchasingsRepository: IPurchasingsRepository
    ) { }

   public async execute(data: ICreatePurchasingsDTO): Promise<Purchasings> {
     const purchansing =  await this.purchasingsRepository.create(data);
         
     return purchansing;
    }

}

export { CreatePurchasingsService }