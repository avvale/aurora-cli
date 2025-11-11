import {
    DataValueObject,
    TimestampValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class OAuthScopeUpdatedAt extends TimestampValueObject {
    public readonly type: string = 'OAuthScopeUpdatedAt';

    constructor(
        value: string | DataValueObject,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthScopeUpdatedAt',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
            data,
        );
    }
}
