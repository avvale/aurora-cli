import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class AccountUpdatedAt extends TimestampValueObject
{
    public readonly type: 'AccountUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccountUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}