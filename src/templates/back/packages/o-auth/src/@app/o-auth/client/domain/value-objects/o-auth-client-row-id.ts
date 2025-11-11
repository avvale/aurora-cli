import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientRowId extends BigintValueObject {
    public readonly type: string = 'OAuthClientRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthClientRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
