import { ToolsKeyValue, ToolsKeyValueType } from '@api/graphql';
import { ToolsGetKeyValuesQuery } from '@app/tools/key-value';
import { Crypt, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetKeyValuesHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsKeyValue[]> {
        const keyValues = await this.queryBus.ask(
            new ToolsGetKeyValuesQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        for (const keyValue of keyValues) {
            if (keyValue.type === ToolsKeyValueType.SECRET)
                keyValue.value = Crypt.decryptWithAuroraPrivateKey(
                    keyValue.value,
                );
        }

        return keyValues;
    }
}
