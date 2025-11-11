import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class OAuthAccessTokenAccountId extends UuidValueObject {
    public readonly type: string = 'OAuthAccessTokenAccountId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthAccessTokenAccountId',
                    nullable: true,
                    undefinable: true,
                    length: 36,
                },
                validationRules,
            ),
            data,
        );
    }
}
