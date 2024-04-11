import { MessageIOutboxRepository } from '@app/message/outbox';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageMaxOutboxService
{
    constructor(
        private readonly repository: MessageIOutboxRepository,
    ) {}

    async main(
        column: string,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.max(
            column,
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
