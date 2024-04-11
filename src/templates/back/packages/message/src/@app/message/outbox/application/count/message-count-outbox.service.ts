import { MessageIOutboxRepository } from '@app/message/outbox';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCountOutboxService
{
    constructor(
        private readonly repository: MessageIOutboxRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.count(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
