import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class AccessTokenUpdatedAt extends TimestampValueObject
{
    public readonly type: 'AccessTokenUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}