import {
    DataValueObject,
    TimestampValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class OAuthClientDeletedAt extends TimestampValueObject {
    public readonly type: string = 'OAuthClientDeletedAt';

    constructor(
        value: string | DataValueObject,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthClientDeletedAt',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
            data,
        );
    }
}
