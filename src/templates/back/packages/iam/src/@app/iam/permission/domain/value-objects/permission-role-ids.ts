import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class PermissionRoleIds extends UuidArrayValueObject
{
    public readonly type: string = 'PermissionRoleIds';

    constructor(value: string | string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'PermissionRoleIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}