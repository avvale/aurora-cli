import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class AccessTokenCreatedAt extends TimestampValueObject
{
    public readonly type: 'AccessTokenCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}