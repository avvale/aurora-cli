import { ToolsAddKeyValuesContextEvent, ToolsIKeyValueRepository, ToolsKeyValue } from '@app/tools/key-value';
import {
    ToolsKeyValueCreatedAt,
    ToolsKeyValueDeletedAt,
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
    ToolsKeyValueKey,
    ToolsKeyValueType,
    ToolsKeyValueUpdatedAt,
    ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsUpdateKeyValuesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIKeyValueRepository,
    ) {}

    async main(
        payload: {
            id?: ToolsKeyValueId;
            key?: ToolsKeyValueKey;
            type?: ToolsKeyValueType;
            value?: ToolsKeyValueValue;
            isActive?: ToolsKeyValueIsActive;
            description?: ToolsKeyValueDescription;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const keyValue = ToolsKeyValue.register(
            payload.id,
            payload.key,
            payload.type,
            payload.value,
            payload.isActive,
            payload.description,
            null, // createdAt
            new ToolsKeyValueUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            keyValue,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const keyValues = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const keyValuesRegister = this.publisher.mergeObjectContext(
            new ToolsAddKeyValuesContextEvent(
                keyValues,
                cQMetadata,
            ),
        );

        keyValuesRegister.updated(); // apply event to model events
        keyValuesRegister.commit(); // commit all events of model
    }
}
