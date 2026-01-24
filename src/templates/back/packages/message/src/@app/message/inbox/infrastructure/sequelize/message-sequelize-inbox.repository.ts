import {
  MessageIInboxRepository,
  MessageInbox,
  MessageInboxMapper,
  MessageInboxModel,
} from '@app/message/inbox';
import {
  AuditingRunner,
  ICriteria,
  SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MessageSequelizeInboxRepository
  extends SequelizeRepository<MessageInbox, MessageInboxModel>
  implements MessageIInboxRepository
{
  public readonly aggregateName: string = 'MessageInbox';
  public readonly mapper: MessageInboxMapper = new MessageInboxMapper();

  constructor(
    @InjectModel(MessageInboxModel)
    public readonly repository: typeof MessageInboxModel,
    public readonly criteria: ICriteria,
    public readonly auditingRunner: AuditingRunner,
  ) {
    super();
  }
}
