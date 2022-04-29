import { UuidArrayValueObject, ValidationRules } from 'aurora-ts-core';

export class RolePermissionIds extends UuidArrayValueObject
{
    public readonly type: 'RolePermissionIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RolePermissionIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}