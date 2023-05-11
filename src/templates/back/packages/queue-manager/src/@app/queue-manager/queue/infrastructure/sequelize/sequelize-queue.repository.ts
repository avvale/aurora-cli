import { Injectable, LiteralObject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IQueueRepository } from '../../domain/queue.repository';
import { QueueManagerQueue } from '../../domain/queue.aggregate';
import { QueueMapper } from '../../domain/queue.mapper';
import { QueueManagerQueueModel } from './sequelize-queue.model';

@Injectable()
export class SequelizeQueueRepository extends SequelizeRepository<QueueManagerQueue, QueueManagerQueueModel> implements IQueueRepository
{
    public readonly aggregateName: string = 'QueueManagerQueue';
    public readonly mapper: QueueMapper = new QueueMapper();

    constructor(
        @InjectModel(QueueManagerQueueModel)
        public readonly repository: typeof QueueManagerQueueModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}