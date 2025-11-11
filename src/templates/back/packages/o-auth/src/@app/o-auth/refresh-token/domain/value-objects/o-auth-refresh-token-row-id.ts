import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthRefreshTokenRowId extends BigintValueObject {
    public readonly type: string = 'OAuthRefreshTokenRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthRefreshTokenRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
