import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class ScopeDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'ScopeDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ScopeDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}