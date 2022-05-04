import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class PermissionUpdatedAt extends TimestampValueObject
{
    public readonly type: 'PermissionUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}