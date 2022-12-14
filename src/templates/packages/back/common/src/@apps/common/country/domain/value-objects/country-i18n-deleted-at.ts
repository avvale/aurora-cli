import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class CountryI18NDeletedAt extends TimestampValueObject
{
    public readonly type: 'CountryI18NDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}