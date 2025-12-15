import { ToolsCreateKeyValueInput, ToolsKeyValue } from '@api/graphql';
import { ToolsFindKeyValueByIdQuery } from '@app/tools/key-value';
import { AuditingMeta, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { createKeyValue } from '../shared';

@Injectable()
export class ToolsCreateKeyValueHandler {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: ToolsCreateKeyValueInput,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue> {
        await createKeyValue(this.moduleRef, payload, timezone, auditing);

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
