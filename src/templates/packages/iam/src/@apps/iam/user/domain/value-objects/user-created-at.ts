import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class UserCreatedAt extends TimestampValueObject
{
    public readonly type: 'UserCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}