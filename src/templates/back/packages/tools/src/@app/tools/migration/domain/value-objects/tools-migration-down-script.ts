import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationDownScript extends StringValueObject {
    public readonly type: string = 'ToolsMigrationDownScript';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsMigrationDownScript',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
