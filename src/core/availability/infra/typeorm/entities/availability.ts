import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    schema: 'SISCPT',
    name: 'ESTOQUE_MATERIAL',
})
class Availability {
    @PrimaryColumn({ name: 'CD_PRODUTO', type: 'int' })
    materialCode!: number;

    @Column({ name: 'CD_CENTRO', type: 'int', nullable: true })
    distributionCenterCode!: number;

    @Column({ name: 'QT_LIVRE_UTILIZACAO' })
    totalStock!: number;

    @Column({ name: 'QT_EMPENHO' })
    usedStock!: number;
}

export default Availability;
