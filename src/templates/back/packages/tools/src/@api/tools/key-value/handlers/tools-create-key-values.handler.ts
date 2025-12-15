import { ToolsCreateKeyValueInput } from '@api/graphql';
import { AuditingMeta } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { createKeyValues } from '../shared';

@Injectable()
export class ToolsCreateKeyValuesHandler {
    constructor(private readonly moduleRef: ModuleRef) {}

    async main(
        payload: ToolsCreateKeyValueInput[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        await createKeyValues(this.moduleRef, payload, timezone, auditing);
        return true;
    }
}
