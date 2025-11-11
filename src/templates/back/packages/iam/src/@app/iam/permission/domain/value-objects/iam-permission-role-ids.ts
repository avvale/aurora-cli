import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamPermissionRoleIds extends UuidArrayValueObject {
    public readonly type: string = 'IamPermissionRoleIds';

    constructor(
        value: string | string[],
        validationRules: ValidationRules = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamPermissionRoleIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
