import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class TenantDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'TenantDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}