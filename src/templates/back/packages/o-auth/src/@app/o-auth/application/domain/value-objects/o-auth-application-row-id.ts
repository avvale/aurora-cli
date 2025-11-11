import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationRowId extends BigintValueObject {
    public readonly type: string = 'OAuthApplicationRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthApplicationRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
