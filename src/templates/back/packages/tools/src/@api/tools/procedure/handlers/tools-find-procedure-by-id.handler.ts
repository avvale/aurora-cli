import { ToolsProcedure } from '@api/graphql';
import { ToolsProcedureDto } from '@api/tools/procedure';
import { ToolsFindProcedureByIdQuery } from '@app/tools/procedure';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindProcedureByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsProcedure | ToolsProcedureDto>
    {
        return await this.queryBus.ask(new ToolsFindProcedureByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
