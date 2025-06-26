import { ToolsProcedure, ToolsUpdateProceduresInput } from '@api/graphql';
import { ToolsProcedureDto, ToolsUpdateProceduresDto } from '@api/tools/procedure';
import { ToolsGetProceduresQuery, ToolsUpdateProceduresCommand } from '@app/tools/procedure';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpdateProceduresHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: ToolsUpdateProceduresInput | ToolsUpdateProceduresDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsProcedure | ToolsProcedureDto>
    {
        await this.commandBus.dispatch(new ToolsUpdateProceduresCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new ToolsGetProceduresQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
