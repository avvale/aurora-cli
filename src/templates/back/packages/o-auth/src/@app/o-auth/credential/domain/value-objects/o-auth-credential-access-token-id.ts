import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class OAuthCredentialAccessTokenId extends UuidValueObject {
    public readonly type: string = 'OAuthCredentialAccessTokenId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthCredentialAccessTokenId',
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
