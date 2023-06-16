import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nId extends UuidValueObject
{
    public readonly type: string = 'CountryI18nId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18nId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}