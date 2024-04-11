import { Pagination } from '@api/graphql';
import { MessagePaginateInboxSettingsQuery } from '@app/message/inbox-setting';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagePaginateInboxSettingsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new MessagePaginateInboxSettingsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
