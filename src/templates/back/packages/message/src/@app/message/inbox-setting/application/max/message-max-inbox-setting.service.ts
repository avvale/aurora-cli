import { MessageIInboxSettingRepository } from '@app/message/inbox-setting';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageMaxInboxSettingService
{
    constructor(
        private readonly repository: MessageIInboxSettingRepository,
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
