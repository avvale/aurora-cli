import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class PermissionUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'PermissionUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}