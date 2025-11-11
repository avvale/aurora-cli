import {
    DataValueObject,
    TimestampValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class OAuthRefreshTokenExpiresAt extends TimestampValueObject {
    public readonly type: string = 'OAuthRefreshTokenExpiresAt';

    constructor(
        value: string | DataValueObject,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthRefreshTokenExpiresAt',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
            data,
        );
    }
}
