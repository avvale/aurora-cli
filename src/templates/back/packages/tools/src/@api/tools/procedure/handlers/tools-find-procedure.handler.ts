import { ToolsProcedure } from '@api/graphql';
import { ToolsProcedureDto } from '@api/tools/procedure';
import { ToolsFindProcedureQuery } from '@app/tools/procedure';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindProcedureHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsProcedure | ToolsProcedureDto>
    {
        return await this.queryBus.ask(new ToolsFindProcedureQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
