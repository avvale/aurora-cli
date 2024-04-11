import { MessageIMessageRepository } from '@app/message/message';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageSumMessageService
{
    constructor(
        private readonly repository: MessageIMessageRepository,
    ) {}

    async main(
        column: string,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.sum(
            column,
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
