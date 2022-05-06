import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class PermissionRoleId extends UuidValueObject
{
    public readonly type: 'PermissionRoleId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionRoleId',
            nullable   : false,
            undefinable: false,
            length     : 36
        }, validationRules), data);
    }
}