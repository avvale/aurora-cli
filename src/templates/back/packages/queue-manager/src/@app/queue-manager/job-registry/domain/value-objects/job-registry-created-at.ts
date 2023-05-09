import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class JobRegistryCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'JobRegistryCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}