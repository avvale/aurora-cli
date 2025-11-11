import {
    ToolsIMigrationRepository,
    ToolsMigration,
} from '@app/tools/migration';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetMigrationsService {
    constructor(private readonly repository: ToolsIMigrationRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<ToolsMigration[] | LiteralObject[]> {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
