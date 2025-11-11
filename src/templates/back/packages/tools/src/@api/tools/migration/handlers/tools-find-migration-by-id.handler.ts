import { ToolsMigration } from '@api/graphql';
import { ToolsMigrationDto } from '@api/tools/migration';
import { ToolsFindMigrationByIdQuery } from '@app/tools/migration';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindMigrationByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsMigration | ToolsMigrationDto> {
        return await this.queryBus.ask(
            new ToolsFindMigrationByIdQuery(id, constraint, {
                timezone,
            }),
        );
    }
}
