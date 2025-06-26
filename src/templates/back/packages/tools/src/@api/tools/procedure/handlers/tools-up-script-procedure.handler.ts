import { ToolsRawSQLInformationSchemaCommand } from '@app/tools/information-schema';
import { ToolsFindProcedureByIdQuery, ToolsUpdateProcedureByIdCommand } from '@app/tools/procedure';
import { ICommandBus, IQueryBus, now } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpScriptProcedureHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        procedureId: string,
        timezone?: string,
    ): Promise<boolean>
    {
        const procedure = await this.queryBus.ask(new ToolsFindProcedureByIdQuery(
            procedureId,
            {},
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new ToolsRawSQLInformationSchemaCommand(
            {
                rawSQL: procedure.upScript,
            },
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new ToolsUpdateProcedureByIdCommand(
            {
                id         : procedure.id,
                isInstalled: true,
                executedAt : now().tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            },
            {},
            {
                timezone,
            },
        ));

        return true;
    }
}