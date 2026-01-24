import {
  QueueManagerIQueueRepository,
  QueueManagerQueue,
  QueueManagerQueueMapper,
  QueueManagerQueueModel,
} from '@app/queue-manager/queue';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class QueueManagerSequelizeQueueRepository
  extends SequelizeRepository<QueueManagerQueue, QueueManagerQueueModel>
  implements QueueManagerIQueueRepository
{
  public readonly aggregateName: string = 'QueueManagerQueue';
  public readonly mapper: QueueManagerQueueMapper =
    new QueueManagerQueueMapper();

  constructor(
    @InjectModel(QueueManagerQueueModel)
    public readonly repository: typeof QueueManagerQueueModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
