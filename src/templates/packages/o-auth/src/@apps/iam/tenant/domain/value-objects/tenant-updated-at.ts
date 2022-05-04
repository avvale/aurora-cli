import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class TenantUpdatedAt extends TimestampValueObject
{
    public readonly type: 'TenantUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'TenantUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}