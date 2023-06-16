import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'CountryI18nCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}