import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationSort extends SmallintValueObject {
    public readonly type: string = 'ToolsMigrationSort';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsMigrationSort',
                    nullable: true,
                    undefinable: true,
                    unsigned: true,
                },
                validationRules,
            ),
        );
    }
}
