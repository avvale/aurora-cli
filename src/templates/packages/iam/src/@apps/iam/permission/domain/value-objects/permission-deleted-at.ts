import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class PermissionDeletedAt extends TimestampValueObject
{
    public readonly type: 'PermissionDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}