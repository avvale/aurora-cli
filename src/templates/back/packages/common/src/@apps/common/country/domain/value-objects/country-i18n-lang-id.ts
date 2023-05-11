import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryI18NLangId extends UuidValueObject
{
    public readonly type: 'CountryI18NLangId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NLangId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}