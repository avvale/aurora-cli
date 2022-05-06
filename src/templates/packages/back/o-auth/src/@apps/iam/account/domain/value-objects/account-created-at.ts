import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountCreatedAt extends TimestampValueObject
{
    public readonly type: 'AccountCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}