import { Purchasings } from "../infra/typeorm/entities/Purchasings";

interface ICreatePurchasingsDTO {
  total: number;
  payment_type: string;
  status: string;
  id_product: number;
}

interface IPurchasingsPagination {
    purchasing: Purchasings [];
    totalPurchasings: number;
    totalPages: number;
}

interface IUpdatePurchasingsDTO extends ICreatePurchasingsDTO {
    id: number;
}

export { ICreatePurchasingsDTO, IPurchasingsPagination, IUpdatePurchasingsDTO }