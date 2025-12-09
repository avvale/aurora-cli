import {
    MessageIMessageRepository,
    MessageMessage,
    MessageMessageMapper,
    MessageMessageModel,
} from '@app/message/message';
import {
    AuditingRunner,
    ICriteria,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MessageSequelizeMessageRepository
    extends SequelizeRepository<MessageMessage, MessageMessageModel>
    implements MessageIMessageRepository
{
    public readonly aggregateName: string = 'MessageMessage';
    public readonly mapper: MessageMessageMapper = new MessageMessageMapper();

    constructor(
        @InjectModel(MessageMessageModel)
        public readonly repository: typeof MessageMessageModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }
}
