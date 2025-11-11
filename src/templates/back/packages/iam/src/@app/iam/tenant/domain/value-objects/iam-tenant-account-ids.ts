import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantAccountIds extends UuidArrayValueObject {
    public readonly type: string = 'IamTenantAccountIds';

    constructor(
        value: string | string[],
        validationRules: ValidationRules = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamTenantAccountIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
