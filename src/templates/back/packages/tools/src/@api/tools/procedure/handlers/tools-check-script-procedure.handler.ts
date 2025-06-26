import { ToolsProcedureType } from '@api/graphql';
import { ToolsInformationSchemaResponse, ToolsRawSQLInformationSchemasQuery } from '@app/tools/information-schema';
import { ToolsFindProcedureByIdQuery, ToolsUpdateProcedureByIdCommand } from '@app/tools/procedure';
import { ICommandBus, IQueryBus, now } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCheckScriptProcedureHandler
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
        let response;
        const procedure = await this.queryBus.ask(new ToolsFindProcedureByIdQuery(
            procedureId,
            {},
            {
                timezone,
            },
        ));

        switch (procedure.type)
        {
            case ToolsProcedureType.PROCEDURE:
            case ToolsProcedureType.FUNCTION:
                response = await this.queryBus.ask<ToolsRawSQLInformationSchemasQuery, ToolsInformationSchemaResponse>(new ToolsRawSQLInformationSchemasQuery(
                    `
                        SELECT
                            routine_name AS "routineName",
                            routine_type AS "routineType",
                            data_type AS "dataType"
                        FROM information_schema.routines
                        WHERE routine_name = '${procedure.name}';
                    `,
                    {
                        timezone,
                    },
                ));
                break;

            case ToolsProcedureType.TRIGGER:
                response = await this.queryBus.ask<ToolsRawSQLInformationSchemasQuery, ToolsInformationSchemaResponse>(new ToolsRawSQLInformationSchemasQuery(
                    `
                        SELECT
                            event_object_table AS "eventObjectTable",
                            trigger_name AS "triggerName",
                            action_timing AS "actionTiming",
                            event_manipulation AS "eventManipulation"
                        FROM information_schema.triggers
                        WHERE trigger_name = '${procedure.name}';
                    `,
                    {
                        timezone,
                    },
                ));
                break;

            default:
                throw new BadRequestException(`The procedure type '${procedure.type}' is not supported.`);
        }

        await this.commandBus.dispatch(new ToolsUpdateProcedureByIdCommand(
            {
                id         : procedure.id,
                isInstalled: response.value.length > 0,
                checkedAt  : now().tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            },
            {},
            {
                timezone,
            },
        ));

        return true;
    }
}