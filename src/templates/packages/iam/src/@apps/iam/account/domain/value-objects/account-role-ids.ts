import { UuidArrayValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountRoleIds extends UuidArrayValueObject
{
    public readonly type: 'AccountRoleIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccountRoleIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}