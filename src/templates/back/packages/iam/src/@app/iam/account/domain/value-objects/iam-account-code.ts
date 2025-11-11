import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountCode extends StringValueObject {
    public readonly type: string = 'IamAccountCode';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountCode',
                    nullable: true,
                    undefinable: true,
                    maxLength: 64,
                },
                validationRules,
            ),
        );
    }
}
