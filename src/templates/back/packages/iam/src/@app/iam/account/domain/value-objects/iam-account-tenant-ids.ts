import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountTenantIds extends UuidArrayValueObject {
    public readonly type: string = 'IamAccountTenantIds';

    constructor(
        value: string | string[],
        validationRules: ValidationRules = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountTenantIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
