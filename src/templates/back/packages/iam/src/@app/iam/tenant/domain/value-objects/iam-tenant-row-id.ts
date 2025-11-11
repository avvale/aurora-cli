import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamTenantRowId extends BigintValueObject {
    public readonly type: string = 'IamTenantRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamTenantRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
