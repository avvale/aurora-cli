import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryI18NUpdatedAt extends TimestampValueObject
{
    public readonly type: 'CountryI18NUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}