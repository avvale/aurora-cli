import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamRoleDefaultRedirection extends StringValueObject {
    public readonly type: string = 'IamRoleDefaultRedirection';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamRoleDefaultRedirection',
                    nullable: true,
                    undefinable: true,
                    maxLength: 2046,
                },
                validationRules,
            ),
        );
    }
}
