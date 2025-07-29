import { ToolsMigration, ToolsUpdateMigrationsInput } from '@api/graphql';
import { ToolsMigrationDto, ToolsUpdateMigrationsDto } from '@api/tools/migration';
import { ToolsGetMigrationsQuery, ToolsUpdateMigrationsCommand } from '@app/tools/migration';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpdateMigrationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: ToolsUpdateMigrationsInput | ToolsUpdateMigrationsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsMigration | ToolsMigrationDto>
    {
        await this.commandBus.dispatch(new ToolsUpdateMigrationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new ToolsGetMigrationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
