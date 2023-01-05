import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Products } from "@modules/products/infra/typeorm/entities/Products";

@Entity('purchasings')
class Purchasings {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    total: number;

    @Column()
    payment_type: string;

    @Column()
    status: string;

    // @ManyToOne(() => Products)
    // @JoinColumn({ name: 'id_product' })
    // product: Products;
    @Column()
    id_product: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export { Purchasings }