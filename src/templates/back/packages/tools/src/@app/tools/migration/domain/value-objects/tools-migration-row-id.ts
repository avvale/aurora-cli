import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationRowId extends BigintValueObject {
    public readonly type: string = 'ToolsMigrationRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsMigrationRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
