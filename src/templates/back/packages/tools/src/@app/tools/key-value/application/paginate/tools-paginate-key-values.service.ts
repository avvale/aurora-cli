import { ToolsIKeyValueRepository, ToolsKeyValue } from '@app/tools/key-value';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsPaginateKeyValuesService {
    constructor(private readonly repository: ToolsIKeyValueRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<ToolsKeyValue>> {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
