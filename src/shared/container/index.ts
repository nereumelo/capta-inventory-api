import { container } from 'tsyringe';

import AppDataSource from '@db/data-source';

container.registerInstance('dataSource', AppDataSource);

import OracleAvailabilityRepository from '@core/availability/infra/typeorm/repositories/oracle-availability-repository';
import AvailabilityRepository from '@core/availability/repositories/availability-repository';

container.register<AvailabilityRepository>('AvailabilityRepository', OracleAvailabilityRepository);
