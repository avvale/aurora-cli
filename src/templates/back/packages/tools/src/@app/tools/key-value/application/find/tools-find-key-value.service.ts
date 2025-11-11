import { ToolsIKeyValueRepository, ToolsKeyValue } from '@app/tools/key-value';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindKeyValueService {
    constructor(private readonly repository: ToolsIKeyValueRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<ToolsKeyValue> {
        return await this.repository.find({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
