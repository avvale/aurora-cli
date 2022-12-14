import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class ScopeUpdatedAt extends TimestampValueObject
{
    public readonly type: 'ScopeUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ScopeUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}