import { WhatsappITimelineRepository, WhatsappTimeline } from '@app/whatsapp/timeline';
import { WhatsappTimelineId } from '@app/whatsapp/timeline/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappFindTimelineByIdService
{
    constructor(
        private readonly repository: WhatsappITimelineRepository,
    ) {}

    async main(
        id: WhatsappTimelineId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<WhatsappTimeline>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
