import { Pagination } from '@api/graphql';
import { WhatsappPaginateTimelinesQuery } from '@app/whatsapp/timeline';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappPaginateTimelinesHandler
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
        return await this.queryBus.ask(new WhatsappPaginateTimelinesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
