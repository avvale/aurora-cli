import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class PermissionPermissionId extends UuidValueObject
{
    public readonly type: 'PermissionPermissionId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionPermissionId',
            nullable   : false,
            undefinable: false,
            length     : 36
        }, validationRules), data);
    }
}