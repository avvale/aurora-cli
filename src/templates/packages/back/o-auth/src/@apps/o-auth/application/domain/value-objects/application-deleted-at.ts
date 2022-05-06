import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class ApplicationDeletedAt extends TimestampValueObject
{
    public readonly type: 'ApplicationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}