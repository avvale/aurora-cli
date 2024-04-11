import { MessageIInboxSettingRepository, MessageInboxSetting, MessageInboxSettingMapper, MessageInboxSettingModel } from '@app/message/inbox-setting';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MessageSequelizeInboxSettingRepository extends SequelizeRepository<MessageInboxSetting, MessageInboxSettingModel> implements MessageIInboxSettingRepository
{
    public readonly aggregateName: string = 'MessageInboxSetting';
    public readonly mapper: MessageInboxSettingMapper = new MessageInboxSettingMapper();

    constructor(
        @InjectModel(MessageInboxSettingModel)
        public readonly repository: typeof MessageInboxSettingModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
