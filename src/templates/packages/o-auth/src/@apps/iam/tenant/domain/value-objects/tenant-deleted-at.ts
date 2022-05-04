import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantDeletedAt extends TimestampValueObject
{
    public readonly type: 'TenantDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}