import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18nCountryId extends UuidValueObject
{
    public readonly type: 'CountryI18nCountryId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nCountryId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}