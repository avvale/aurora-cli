import { ToolsIKeyValueRepository, ToolsKeyValue } from '@app/tools/key-value';
import { ToolsKeyValueId } from '@app/tools/key-value/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindKeyValueByIdService {
    constructor(private readonly repository: ToolsIKeyValueRepository) {}

    async main(
        id: ToolsKeyValueId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<ToolsKeyValue> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
