
interface ICreatePurchasingsDTO {
  total: number;
  payment_type: string;
  status: string;
  id_product: number;
}

interface IPurchasingsPagination {
    purchasing: [];
    totalPurchasings: number;
    totalPages: number;
}

interface IUpdatePurchasingsDTO extends ICreatePurchasingsDTO {
    id: number;
}

export { ICreatePurchasingsDTO, IPurchasingsPagination, IUpdatePurchasingsDTO }