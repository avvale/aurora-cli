import { WhatsappIMessageRepository, WhatsappMessage, WhatsappMessageMapper, WhatsappMessageModel } from '@app/whatsapp/message';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WhatsappSequelizeMessageRepository extends SequelizeRepository<WhatsappMessage, WhatsappMessageModel> implements WhatsappIMessageRepository
{
    public readonly aggregateName: string = 'WhatsappMessage';
    public readonly mapper: WhatsappMessageMapper = new WhatsappMessageMapper();

    constructor(
        @InjectModel(WhatsappMessageModel)
        public readonly repository: typeof WhatsappMessageModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
