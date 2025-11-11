import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthScopeRowId extends BigintValueObject {
    public readonly type: string = 'OAuthScopeRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthScopeRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
