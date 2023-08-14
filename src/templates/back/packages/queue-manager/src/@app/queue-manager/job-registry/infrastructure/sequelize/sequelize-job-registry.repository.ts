import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistry } from '../../domain/queue-manager-job-registry.aggregate';
import { QueueManagerJobRegistryMapper } from '../../domain/queue-manager-job-registry.mapper';
import { QueueManagerJobRegistryModel } from './sequelize-job-registry.model';

@Injectable()
export class SequelizeJobRegistryRepository extends SequelizeRepository<QueueManagerJobRegistry, QueueManagerJobRegistryModel> implements QueueManagerIJobRegistryRepository
{
    public readonly aggregateName: string = 'QueueManagerJobRegistry';
    public readonly mapper: QueueManagerJobRegistryMapper = new QueueManagerJobRegistryMapper();

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