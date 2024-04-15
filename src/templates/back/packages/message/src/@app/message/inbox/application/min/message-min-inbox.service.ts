import { MessageIInboxRepository } from '@app/message/inbox';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageMinInboxService
{
    constructor(
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        column: string,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.min(
            column,
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
