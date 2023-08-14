import { QueueManagerIJobRegistryRepository, QueueManagerJobRegistry, QueueManagerJobRegistryMapper, QueueManagerJobRegistryModel } from '@app/queue-manager/job-registry';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class QueueManagerSequelizeJobRegistryRepository extends SequelizeRepository<QueueManagerJobRegistry, QueueManagerJobRegistryModel> implements QueueManagerIJobRegistryRepository
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
