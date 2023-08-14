import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamPermissionRoleRoleId extends UuidValueObject
{
    public readonly type: 'IamPermissionRoleId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamPermissionRoleId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}