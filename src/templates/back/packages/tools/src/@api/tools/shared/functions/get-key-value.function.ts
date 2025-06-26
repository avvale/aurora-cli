import { ToolsKeyValue, ToolsKeyValueType } from '@api/graphql';
import { ToolsFindKeyValueQuery } from '@app/tools/key-value';
import { IQueryBus } from '@aurorajs.dev/core';

export const getKeyValue = async <T = string | boolean | number | Array<any> | object>(
    queryBus: IQueryBus,
    key: string,
): Promise<T> =>
{
    const keyValue: ToolsKeyValue = await queryBus.ask(new ToolsFindKeyValueQuery({ where: { key }}));

    switch (keyValue.type)
    {
        case ToolsKeyValueType.STRING:
            return keyValue.value;

        case ToolsKeyValueType.BOOLEAN:
            return (keyValue.value === 'true') as T;

        case ToolsKeyValueType.NUMBER:
            return Number(keyValue.value) as T;

        case ToolsKeyValueType.ARRAY:
        case ToolsKeyValueType.OBJECT:
            return JSON.parse(keyValue.value);
    }
};