import {
    ToolsIProcedureRepository,
    ToolsProcedure,
} from '@app/tools/procedure';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetProceduresService {
    constructor(private readonly repository: ToolsIProcedureRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<ToolsProcedure[] | LiteralObject[]> {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
