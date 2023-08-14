import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamPermissionRolePermissionId extends UuidValueObject
{
    public readonly type: 'IamPermissionPermissionId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamPermissionPermissionId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}