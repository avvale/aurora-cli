import { UuidArrayValueObject, ValidationRules } from 'aurora-ts-core';

export class RoleAccountIds extends UuidArrayValueObject
{
    public readonly type: 'RoleAccountIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RoleAccountIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}