import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamUserSurname extends StringValueObject {
    public readonly type: string = 'IamUserSurname';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamUserSurname',
                    nullable: true,
                    undefinable: true,
                    maxLength: 255,
                },
                validationRules,
            ),
        );
    }
}
