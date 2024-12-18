import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "@config/env";
import Availability from "@core/availability/infra/typeorm/entities/availability";

const AppDataSource = new DataSource({
  type: "oracle",
  thickMode: true, // Required for OracleDB 11g
  host: env.DB_HOST,
  port: env.DB_PORT,
  serviceName: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  entities: [Availability],
});

export default AppDataSource;
