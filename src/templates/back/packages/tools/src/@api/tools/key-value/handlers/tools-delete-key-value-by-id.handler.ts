import { ToolsKeyValue } from '@api/graphql';
import { ToolsKeyValueDto } from '@api/tools/key-value';
import {
    ToolsDeleteKeyValueByIdCommand,
    ToolsFindKeyValueByIdQuery,
} from '@app/tools/key-value';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ToolsDeleteKeyValueByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto> {
        const keyValue = await this.queryBus.ask(
            new ToolsFindKeyValueByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new ToolsDeleteKeyValueByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        if (keyValue.isCached) await this.cacheManager.del(keyValue.key);

        return keyValue;
    }
}
