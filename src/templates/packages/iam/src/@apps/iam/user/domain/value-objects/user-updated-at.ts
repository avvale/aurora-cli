import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class UserUpdatedAt extends TimestampValueObject
{
    public readonly type: 'UserUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'UserUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}