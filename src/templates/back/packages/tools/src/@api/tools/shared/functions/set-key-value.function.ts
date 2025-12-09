import {
    ToolsFindKeyValueQuery,
    ToolsUpdateKeyValueByIdCommand,
} from '@app/tools/key-value';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { ModuleRef } from '@nestjs/core';

export const setKeyValue = async <
    T = string | boolean | number | Array<any> | object,
>(
    moduleRef: ModuleRef,
    key: string,
    value: T,
): Promise<void> => {
    const queryBus = moduleRef.get(IQueryBus, { strict: false });
    const commandBus = moduleRef.get(ICommandBus, { strict: false });

    const keyValue = await queryBus.ask(
        new ToolsFindKeyValueQuery({ where: { key } }),
    );

    await commandBus.dispatch(
        new ToolsUpdateKeyValueByIdCommand({
            value: value as any,
            id: keyValue.id,
        }),
    );
};
