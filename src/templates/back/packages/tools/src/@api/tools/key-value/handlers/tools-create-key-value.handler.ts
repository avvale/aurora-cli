import { ToolsCreateKeyValueInput, ToolsKeyValue } from '@api/graphql';
import { ToolsCreateKeyValueDto, ToolsKeyValueDto } from '@api/tools/key-value';
import {
    ToolsCreateKeyValueCommand,
    ToolsFindKeyValueByIdQuery,
} from '@app/tools/key-value';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ToolsCreateKeyValueHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        payload: ToolsCreateKeyValueInput | ToolsCreateKeyValueDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto> {
        await this.commandBus.dispatch(
            new ToolsCreateKeyValueCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        if (payload.isCached)
            await this.cacheManager.set(payload.key, payload.value);

        return await this.queryBus.ask(
            new ToolsFindKeyValueByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
