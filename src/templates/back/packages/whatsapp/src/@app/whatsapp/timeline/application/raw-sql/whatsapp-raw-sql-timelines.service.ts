import { WhatsappITimelineRepository, WhatsappTimeline } from '@app/whatsapp/timeline';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappRawSQLTimelinesService
{
    constructor(
        private readonly repository: WhatsappITimelineRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<WhatsappTimeline[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
