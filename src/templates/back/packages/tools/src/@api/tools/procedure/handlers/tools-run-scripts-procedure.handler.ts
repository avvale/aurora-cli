import { getPackageFile, ICommandBus, IQueryBus, now } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { ToolsProcedure } from '@api/graphql';
import { ToolsRawSQLInformationSchemaCommand, ToolsRawSQLInformationSchemasQuery } from '@app/tools/information-schema';
import { ToolsUpdateProceduresCommand } from '@app/tools/procedure';
import * as semver from 'semver';

@Injectable()
export class ToolsRunScriptsProcedureHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        timezone?: string,
    ): Promise<boolean>
    {
        const packageFile = getPackageFile();
        const version = semver.clean(packageFile.version);

        const response = await this.queryBus.ask(new ToolsRawSQLInformationSchemasQuery(
            `
                SELECT * FROM "ToolsProcedure"
                WHERE
                    string_to_array(SUBSTRING(version FROM 2), '.')::int[] <= ARRAY[${version.split('.').join(',')}]
                    AND
                    "isActive" = true
                    AND
                    ("isExecuted" = false OR "isUpdated" = true)
                ORDER BY string_to_array(SUBSTRING(version FROM 2), '.')::int[] ASC, sort ASC;
            `,
            {
                timezone,
            },
        ));

        const procedures = response.value as unknown as ToolsProcedure[];

        for (const procedure of procedures)
        {
            // eslint-disable-next-line no-await-in-loop
            await this.commandBus.dispatch(new ToolsRawSQLInformationSchemaCommand(
                {
                    rawSQL: procedure.upScript,
                },
                {
                    timezone,
                },
            ));
        }

        await this.commandBus.dispatch(new ToolsUpdateProceduresCommand(
            {
                isExecuted: true,
                isUpdated : false,
                executedAt: now().tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                where: {
                    id: procedures.map(procedure => procedure.id),
                },
            },
            {},
            {
                timezone,
            },
        ));

        return true;
    }
}