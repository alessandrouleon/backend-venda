import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdatePurchasingsDTO } from "../dots/IPurchasingsDTO";
import { Purchasings } from "../infra/typeorm/entities/Purchasings";
import { IPurchasingsRepository } from "../repositories/IPurchasingsRepository";


@injectable()
class UpdatePurchasingsService {

    constructor(
        @inject('PurchasingsRepository')
        private purchasingsRepository: IPurchasingsRepository
    ) { }

    public async execute({ id, ...rest }: IUpdatePurchasingsDTO): Promise<Purchasings> {
        const purchansing = await this.purchasingsRepository.findById(id);

        if (!purchansing) {
            throw new AppError(`This ${id} does not exists!`);
        }

        Object.assign(purchansing, {
            id,
            ...rest
        });

        return await this.purchasingsRepository.update(purchansing);
    }
}

export { UpdatePurchasingsService }