import oracledb from 'oracledb';

async function run() {
  let connection;
  
  try {
    oracledb.initOracleClient();
    
    // Establish a connection to the OracleDB
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });

    const basicQuery = "SELECT SYSDATE FROM DUAL";
    const captaQuery = `SELECT em.* FROM SISCPT.ESTOQUE_MATERIAL em
      WHERE 1=1
      --AND QT_LIVRE_UTILIZACAO > 0
      --AND QT_EMPENHO > 0
      AND CD_PRODUTO = 50428372
      AND CD_CENTRO = 2700`;

    const result = await connection.execute(
      // captaQuery,
      basicQuery,
      [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });

    console.log(result.rows);
  } catch (err: any) {
    console.error('Error connecting to OracleDB:', err.message);
    if (err.code === 'DPI-1047') {
      console.log('\nEnsure that the Oracle Instant Client is correctly installed. Try to run the "setup-db.sh" script.');
    }
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

run();
