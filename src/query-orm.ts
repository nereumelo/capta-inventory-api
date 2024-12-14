import { AppDataSource } from '@config/db/data-source';
import 'reflect-metadata';


async function query() {
  const connection = await AppDataSource.initialize();
  const result = await connection.query(`SELECT SYSDATE FROM DUAL`);
  // const result = await connection.query(`SELECT em.* FROM SISCPT.ESTOQUE_MATERIAL em
  //     WHERE 1=1
  //     --AND QT_LIVRE_UTILIZACAO > 0
  //     --AND QT_EMPENHO > 0
  //     AND CD_PRODUTO = 50428372
  //     AND CD_CENTRO = 2700`);

  console.log(result);
  connection.destroy();
}

query();
