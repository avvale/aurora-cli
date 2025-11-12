import { ToolsIKeyValueRepository, ToolsKeyValue } from '@app/tools/key-value';
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
export class ToolsCreateKeyValueService {
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const keyValue = ToolsKeyValue.register(
            payload.id,
            undefined, // rowId
            payload.key,
            payload.type,
            payload.value,
            payload.isCached,
            payload.isActive,
            payload.description,
            new ToolsKeyValueCreatedAt({ currentTimestamp: true }),
            new ToolsKeyValueUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(keyValue, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const keyValueRegister = this.publisher.mergeObjectContext(keyValue);

        keyValueRegister.created({
            payload: keyValue,
            cQMetadata,
        }); // apply event to model events
        keyValueRegister.commit(); // commit all events of model
    }
}
