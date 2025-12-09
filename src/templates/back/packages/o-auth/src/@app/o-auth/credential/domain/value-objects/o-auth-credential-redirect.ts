import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthCredentialRedirect extends StringValueObject {
    public readonly type: string = 'OAuthCredentialRedirect';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthCredentialRedirect',
                    nullable: true,
                    undefinable: true,
                    maxLength: 2046,
                },
                validationRules,
            ),
        );
    }
}
