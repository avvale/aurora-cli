import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountEmail extends StringValueObject {
    public readonly type: string = 'IamAccountEmail';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountEmail',
                    nullable: true,
                    undefinable: true,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
