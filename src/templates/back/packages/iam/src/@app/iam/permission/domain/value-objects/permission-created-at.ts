import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class PermissionCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'PermissionCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'PermissionCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}