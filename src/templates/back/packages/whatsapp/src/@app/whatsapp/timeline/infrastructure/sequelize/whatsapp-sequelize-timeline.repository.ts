import { WhatsappITimelineRepository, WhatsappTimeline, WhatsappTimelineMapper, WhatsappTimelineModel } from '@app/whatsapp/timeline';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WhatsappSequelizeTimelineRepository extends SequelizeRepository<WhatsappTimeline, WhatsappTimelineModel> implements WhatsappITimelineRepository
{
    public readonly aggregateName: string = 'WhatsappTimeline';
    public readonly mapper: WhatsappTimelineMapper = new WhatsappTimelineMapper();

    constructor(
        @InjectModel(WhatsappTimelineModel)
        public readonly repository: typeof WhatsappTimelineModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
