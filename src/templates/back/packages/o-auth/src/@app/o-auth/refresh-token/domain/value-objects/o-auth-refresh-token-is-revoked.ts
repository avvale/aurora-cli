import {
    BooleanValueObject,
    DataValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class OAuthRefreshTokenIsRevoked extends BooleanValueObject {
    public readonly type: string = 'OAuthRefreshTokenIsRevoked';

    constructor(
        value: boolean,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthRefreshTokenIsRevoked',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
            data,
        );
    }
}
