import {
    ToolsCreatedKeyValueEvent,
    ToolsCreatedKeyValuesEvent,
    ToolsDeletedKeyValueEvent,
    ToolsDeletedKeyValuesEvent,
    ToolsKeyValue,
} from '@app/tools/key-value';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsAddKeyValuesContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: ToolsKeyValue[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new ToolsCreatedKeyValuesEvent({
                payload: this.aggregateRoots.map(
                    (keyValue) =>
                        new ToolsCreatedKeyValueEvent({
                            payload: {
                                id: keyValue.id.value,
                                key: keyValue.key.value,
                                type: keyValue.type.value,
                                value: keyValue.value?.value,
                                isCached: keyValue.isCached.value,
                                isActive: keyValue.isActive.value,
                                description: keyValue.description?.value,
                                createdAt: keyValue.createdAt?.value,
                                updatedAt: keyValue.updatedAt?.value,
                                deletedAt: keyValue.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new ToolsDeletedKeyValuesEvent({
                payload: this.aggregateRoots.map(
                    (keyValue) =>
                        new ToolsDeletedKeyValueEvent({
                            payload: {
                                id: keyValue.id.value,
                                rowId: keyValue.rowId.value,
                                key: keyValue.key.value,
                                type: keyValue.type.value,
                                value: keyValue.value?.value,
                                isCached: keyValue.isCached.value,
                                isActive: keyValue.isActive.value,
                                description: keyValue.description?.value,
                                createdAt: keyValue.createdAt?.value,
                                updatedAt: keyValue.updatedAt?.value,
                                deletedAt: keyValue.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
