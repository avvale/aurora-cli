import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class AccountDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AccountDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}