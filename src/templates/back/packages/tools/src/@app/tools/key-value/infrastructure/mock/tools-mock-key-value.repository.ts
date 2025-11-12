import {
    ToolsIKeyValueRepository,
    ToolsKeyValue,
    toolsMockKeyValueData,
} from '@app/tools/key-value';
import {
    ToolsKeyValueCreatedAt,
    ToolsKeyValueDeletedAt,
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
    ToolsKeyValueIsCached,
    ToolsKeyValueKey,
    ToolsKeyValueRowId,
    ToolsKeyValueType,
    ToolsKeyValueUpdatedAt,
    ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsMockKeyValueRepository
    extends MockRepository<ToolsKeyValue>
    implements ToolsIKeyValueRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'ToolsKeyValue';
    public collectionSource: ToolsKeyValue[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>toolsMockKeyValueData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                ToolsKeyValue.register(
                    new ToolsKeyValueId(itemCollection.id),
                    new ToolsKeyValueRowId(itemCollection.rowId),
                    new ToolsKeyValueKey(itemCollection.key),
                    new ToolsKeyValueType(itemCollection.type),
                    new ToolsKeyValueValue(itemCollection.value),
                    new ToolsKeyValueIsCached(itemCollection.isCached),
                    new ToolsKeyValueIsActive(itemCollection.isActive),
                    new ToolsKeyValueDescription(itemCollection.description),
                    new ToolsKeyValueCreatedAt(itemCollection.createdAt),
                    new ToolsKeyValueUpdatedAt(itemCollection.updatedAt),
                    new ToolsKeyValueDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
