import { ToolsKeyValue, ToolsUpdateKeyValueByIdInput } from '@api/graphql';
import {
    ToolsKeyValueDto,
    ToolsUpdateKeyValueByIdDto,
} from '@api/tools/key-value';
import {
    ToolsFindKeyValueByIdQuery,
    ToolsUpdateKeyValueByIdCommand,
} from '@app/tools/key-value';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ToolsUpdateKeyValueByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async main(
        payload: ToolsUpdateKeyValueByIdInput | ToolsUpdateKeyValueByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto> {
        const keyValue = await this.queryBus.ask(
            new ToolsFindKeyValueByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        const dataToUpdate = diff(payload, keyValue);

        await this.commandBus.dispatch(
            new ToolsUpdateKeyValueByIdCommand(
                {
                    ...dataToUpdate,
                    id: payload.id,
                },
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        const keyValueUpdated = await this.queryBus.ask<
            ToolsFindKeyValueByIdQuery,
            ToolsKeyValue
        >(
            new ToolsFindKeyValueByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        if (keyValueUpdated.isCached) {
            await this.cacheManager.set(
                keyValueUpdated.key,
                keyValueUpdated.value,
            );
        } else if (payload.isCached === false) {
            await this.cacheManager.del(keyValueUpdated.key);
        }

        return keyValueUpdated;
    }
}
