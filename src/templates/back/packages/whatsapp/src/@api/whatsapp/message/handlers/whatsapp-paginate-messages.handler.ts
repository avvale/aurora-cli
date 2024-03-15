import { Pagination } from '@api/graphql';
import { WhatsappPaginateMessagesQuery } from '@app/whatsapp/message';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappPaginateMessagesHandler
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
        return await this.queryBus.ask(new WhatsappPaginateMessagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
