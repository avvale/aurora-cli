import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class RolePermissionIds extends UuidArrayValueObject
{
    public readonly type: string = 'RolePermissionIds';

    constructor(value: string | string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RolePermissionIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}