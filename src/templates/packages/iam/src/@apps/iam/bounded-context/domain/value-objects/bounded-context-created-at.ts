import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class BoundedContextCreatedAt extends TimestampValueObject
{
    public readonly type: 'BoundedContextCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}