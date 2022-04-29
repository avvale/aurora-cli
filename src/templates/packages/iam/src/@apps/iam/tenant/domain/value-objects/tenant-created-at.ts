import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantCreatedAt extends TimestampValueObject
{
    public readonly type: 'TenantCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}