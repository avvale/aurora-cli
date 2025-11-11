import { ToolsMigration } from '@api/graphql';
import {
    ToolsRawSQLInformationSchemaCommand,
    ToolsRawSQLInformationSchemasQuery,
} from '@app/tools/information-schema';
import { ToolsUpdateMigrationsCommand } from '@app/tools/migration';
import {
    getPackageFile,
    ICommandBus,
    IQueryBus,
    now,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as semver from 'semver';

@Injectable()
export class ToolsRunScriptsMigrationHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(timezone?: string): Promise<boolean> {
        const packageFile = getPackageFile();
        const version = semver.clean(packageFile.version);

        const response = await this.queryBus.ask(
            new ToolsRawSQLInformationSchemasQuery(
                `
                SELECT * FROM "ToolsMigration"
                WHERE
                    string_to_array(SUBSTRING(version FROM 2), '.')::int[] <= ARRAY[${version.split('.').join(',')}]
                    AND
                    "isActive" = true
                    AND
                    "isExecuted" = false
                ORDER BY string_to_array(SUBSTRING(version FROM 2), '.')::int[] ASC, sort ASC;
            `,
                {
                    timezone,
                },
            ),
        );

        const migrations = response.value as unknown as ToolsMigration[];

        for (const migration of migrations) {
            // eslint-disable-next-line no-await-in-loop
            await this.commandBus.dispatch(
                new ToolsRawSQLInformationSchemaCommand(
                    {
                        rawSQL: migration.upScript,
                    },
                    {
                        timezone,
                    },
                ),
            );
        }

        await this.commandBus.dispatch(
            new ToolsUpdateMigrationsCommand(
                {
                    isExecuted: true,
                    executedAt: now()
                        .tz(timezone)
                        .format('YYYY-MM-DD HH:mm:ss'),
                },
                {
                    where: {
                        id: migrations.map((migration) => migration.id),
                    },
                },
                {},
                {
                    timezone,
                },
            ),
        );

        return true;
    }
}
