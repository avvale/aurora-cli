import { ToolsKeyValue, toolsMockKeyValueData } from '@app/tools/key-value';
import {
    ToolsKeyValueCreatedAt,
    ToolsKeyValueDeletedAt,
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
    ToolsKeyValueKey,
    ToolsKeyValueRowId,
    ToolsKeyValueType,
    ToolsKeyValueUpdatedAt,
    ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ToolsMockKeyValueSeeder extends MockSeeder<ToolsKeyValue> {
    public collectionSource: ToolsKeyValue[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const keyValue of _.orderBy(toolsMockKeyValueData, ['id'])) {
            this.collectionSource.push(
                ToolsKeyValue.register(
                    new ToolsKeyValueId(keyValue.id),
                    new ToolsKeyValueRowId(keyValue.rowId),
                    new ToolsKeyValueKey(keyValue.key),
                    new ToolsKeyValueType(keyValue.type),
                    new ToolsKeyValueValue(keyValue.value),
                    new ToolsKeyValueIsActive(keyValue.isActive),
                    new ToolsKeyValueDescription(keyValue.description),
                    new ToolsKeyValueCreatedAt({ currentTimestamp: true }),
                    new ToolsKeyValueUpdatedAt({ currentTimestamp: true }),
                    new ToolsKeyValueDeletedAt(null),
                ),
            );
        }
    }
}
