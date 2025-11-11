import {
    BooleanValueObject,
    DataValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamUserIsTwoFactorAuthenticationEnabled extends BooleanValueObject {
    public readonly type: string = 'IamUserIsTwoFactorAuthenticationEnabled';

    constructor(
        value: boolean,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamUserIsTwoFactorAuthenticationEnabled',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
            data,
        );
    }
}
