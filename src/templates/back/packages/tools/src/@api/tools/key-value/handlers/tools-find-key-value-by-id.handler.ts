import { ToolsKeyValue } from '@api/graphql';
import { ToolsKeyValueDto } from '@api/tools/key-value';
import { ToolsFindKeyValueByIdQuery } from '@app/tools/key-value';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindKeyValueByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto> {
        return await this.queryBus.ask(
            new ToolsFindKeyValueByIdQuery(id, constraint, {
                timezone,
            }),
        );
    }
}
