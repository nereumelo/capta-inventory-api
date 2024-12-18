import { container } from "tsyringe";
import Tokens from "./tokens";

import AppDataSource from "@db/data-source";
container.registerInstance(Tokens.datasource, AppDataSource);

import OracleAvailabilityRepository from "@core/availability/infra/typeorm/repositories/oracle-availability-repository";
import AvailabilityRepository from "@core/availability/repositories/availability-repository";
container.register<AvailabilityRepository>(
  Tokens.availability.repository,
  OracleAvailabilityRepository,
);

import Logger from "@logger";
container.register(Tokens.logger, { useValue: Logger });
