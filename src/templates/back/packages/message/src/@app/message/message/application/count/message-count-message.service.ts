import { MessageIMessageRepository } from '@app/message/message';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCountMessageService
{
    constructor(
        private readonly repository: MessageIMessageRepository,
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
