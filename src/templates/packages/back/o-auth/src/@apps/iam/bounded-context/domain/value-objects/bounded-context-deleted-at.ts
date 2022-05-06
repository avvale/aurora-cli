import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class BoundedContextDeletedAt extends TimestampValueObject
{
    public readonly type: 'BoundedContextDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'BoundedContextDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}