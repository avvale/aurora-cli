import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class ScopeCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'ScopeCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ScopeCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}