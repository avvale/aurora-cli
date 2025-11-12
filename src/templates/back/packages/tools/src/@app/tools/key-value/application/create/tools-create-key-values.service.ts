import {
    ToolsAddKeyValuesContextEvent,
    ToolsIKeyValueRepository,
    ToolsKeyValue,
} from '@app/tools/key-value';
import {
    ToolsKeyValueCreatedAt,
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
    ToolsKeyValueIsCached,
    ToolsKeyValueKey,
    ToolsKeyValueType,
    ToolsKeyValueUpdatedAt,
    ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsCreateKeyValuesService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIKeyValueRepository,
    ) {}

    async main(
        payload: {
            id: ToolsKeyValueId;
            key: ToolsKeyValueKey;
            type: ToolsKeyValueType;
            value: ToolsKeyValueValue;
            isCached: ToolsKeyValueIsCached;
            isActive: ToolsKeyValueIsActive;
            description: ToolsKeyValueDescription;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const keyValues = payload.map((keyValue) =>
            ToolsKeyValue.register(
                keyValue.id,
                undefined, // rowId
                keyValue.key,
                keyValue.type,
                keyValue.value,
                keyValue.isCached,
                keyValue.isActive,
                keyValue.description,
                new ToolsKeyValueCreatedAt({ currentTimestamp: true }),
                new ToolsKeyValueUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(keyValues, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddKeyValuesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const keyValuesRegistered = this.publisher.mergeObjectContext(
            new ToolsAddKeyValuesContextEvent(keyValues, cQMetadata),
        );

        keyValuesRegistered.created(); // apply event to model events
        keyValuesRegistered.commit(); // commit all events of model
    }
}
