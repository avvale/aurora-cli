import { Injectable, LiteralObject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IJobRegistryRepository } from '../../domain/job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/job-registry.aggregate';
import { JobRegistryMapper } from '../../domain/job-registry.mapper';
import { QueueManagerJobRegistryModel } from './sequelize-job-registry.model';

@Injectable()
export class SequelizeJobRegistryRepository extends SequelizeRepository<QueueManagerJobRegistry, QueueManagerJobRegistryModel> implements IJobRegistryRepository
{
    public readonly aggregateName: string = 'QueueManagerJobRegistry';
    public readonly mapper: JobRegistryMapper = new JobRegistryMapper();

    constructor(
        @InjectModel(QueueManagerJobRegistryModel)
        public readonly repository: typeof QueueManagerJobRegistryModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}