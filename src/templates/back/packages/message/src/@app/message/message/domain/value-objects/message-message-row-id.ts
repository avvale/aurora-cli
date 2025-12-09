import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageRowId extends BigintValueObject {
    public readonly type: string = 'MessageMessageRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageMessageRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
