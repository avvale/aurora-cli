import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountRowId extends BigintValueObject {
    public readonly type: string = 'IamAccountRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
