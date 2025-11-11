import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountType extends EnumValueObject {
    public readonly type: string = 'IamAccountType';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountType',
                    nullable: false,
                    undefinable: false,
                    enumOptions: ['USER', 'SERVICE'],
                },
                validationRules,
            ),
        );
    }
}
