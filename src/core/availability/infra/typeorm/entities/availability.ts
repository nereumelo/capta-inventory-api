import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  schema: "SISCPT",
  name: "ESTOQUE_MATERIAL",
})
class Availability {
  @PrimaryColumn({ name: "CD_PRODUTO" })
  materialCode!: number;

  @Column({ name: "CD_CENTRO", nullable: true })
  distributionCenterCode!: number;

  @Column({ name: "QT_LIVRE_UTILIZACAO" })
  onHandStock!: number;

  @Column({ name: "QT_EMPENHO" })
  committedStock!: number;

  @Column({ name: "QT_LIVRE_UTIL_TRANSITO", nullable: true })
  inTransitStock!: number;

  @Column({ name: "ID_ESTOQUE_TRANSITO_HABILITADO", nullable: true })
  enabledInTransitStock!: number;
}

export default Availability;
