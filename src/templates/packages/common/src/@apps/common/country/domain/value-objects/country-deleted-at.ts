import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryDeletedAt extends TimestampValueObject
{
    public readonly type: 'CountryDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}