import {
    MessageIOutboxRepository,
    MessageOutbox,
    MessageOutboxMapper,
    MessageOutboxModel,
} from '@app/message/outbox';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MessageSequelizeOutboxRepository
    extends SequelizeRepository<MessageOutbox, MessageOutboxModel>
    implements MessageIOutboxRepository
{
    public readonly aggregateName: string = 'MessageOutbox';
    public readonly mapper: MessageOutboxMapper = new MessageOutboxMapper();

    constructor(
        @InjectModel(MessageOutboxModel)
        public readonly repository: typeof MessageOutboxModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
