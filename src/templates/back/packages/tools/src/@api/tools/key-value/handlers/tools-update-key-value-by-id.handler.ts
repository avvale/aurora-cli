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
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpdateKeyValueByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
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

        return await this.queryBus.ask(
            new ToolsFindKeyValueByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
