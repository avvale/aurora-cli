import {
    DataValueObject,
    TimestampValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class ToolsMigrationCreatedAt extends TimestampValueObject {
    public readonly type: string = 'ToolsMigrationCreatedAt';

    constructor(
        value: string | DataValueObject,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsMigrationCreatedAt',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
            data,
        );
    }
}
