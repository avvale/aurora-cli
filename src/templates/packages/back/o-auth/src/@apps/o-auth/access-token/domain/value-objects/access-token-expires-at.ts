import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class AccessTokenExpiresAt extends TimestampValueObject
{
    public readonly type: 'AccessTokenExpiresAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenExpiresAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}