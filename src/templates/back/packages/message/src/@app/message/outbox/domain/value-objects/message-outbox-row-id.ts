import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxRowId extends BigintValueObject {
    public readonly type: string = 'MessageOutboxRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageOutboxRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
