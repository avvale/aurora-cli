import { ToolsIKeyValueRepository, ToolsKeyValue } from '@app/tools/key-value';
import {
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
export class ToolsUpdateKeyValueByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIKeyValueRepository,
    ) {}

    async main(
        payload: {
            id: ToolsKeyValueId;
            key?: ToolsKeyValueKey;
            type?: ToolsKeyValueType;
            value?: ToolsKeyValueValue;
            isActive?: ToolsKeyValueIsActive;
            description?: ToolsKeyValueDescription;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const keyValue = ToolsKeyValue.register(
            payload.id,
            undefined, // rowId
            payload.key,
            payload.type,
            payload.value,
            payload.isActive,
            payload.description,
            null, // createdAt
            new ToolsKeyValueUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(keyValue, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const keyValueRegister = this.publisher.mergeObjectContext(keyValue);

        keyValueRegister.updated({
            payload: keyValue,
            cQMetadata,
        }); // apply event to model events
        keyValueRegister.commit(); // commit all events of model
    }
}
