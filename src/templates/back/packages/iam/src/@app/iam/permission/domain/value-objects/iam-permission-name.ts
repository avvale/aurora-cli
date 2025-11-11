import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamPermissionName extends StringValueObject {
    public readonly type: string = 'IamPermissionName';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamPermissionName',
                    nullable: false,
                    undefinable: false,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
