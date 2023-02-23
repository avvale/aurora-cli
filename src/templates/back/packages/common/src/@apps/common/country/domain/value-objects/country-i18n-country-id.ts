import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class CountryI18NCountryId extends UuidValueObject
{
    public readonly type: 'CountryI18NCountryId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NCountryId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}