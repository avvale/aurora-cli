import {
    DataValueObject,
    TimestampValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamBoundedContextCreatedAt extends TimestampValueObject {
    public readonly type: string = 'IamBoundedContextCreatedAt';

    constructor(
        value: string | DataValueObject,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamBoundedContextCreatedAt',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
            data,
        );
    }
}
