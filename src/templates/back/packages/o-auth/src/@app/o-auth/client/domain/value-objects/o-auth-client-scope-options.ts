import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientScopeOptions extends JsonValueObject {
    public readonly type: string = 'OAuthClientScopeOptions';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthClientScopeOptions',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
