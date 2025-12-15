import { Pagination } from '@api/graphql';
import { ToolsPaginateWebhookLogsQuery } from '@app/tools/webhook-log';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsPaginateWebhookLogsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new ToolsPaginateWebhookLogsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
