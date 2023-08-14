import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryI18nLangId extends UuidValueObject
{
    public readonly type: string = 'CommonCountryI18nLangId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountryI18nLangId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}