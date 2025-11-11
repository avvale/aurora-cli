import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantLogo extends JsonValueObject {
    public readonly type: string = 'IamTenantLogo';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamTenantLogo',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
