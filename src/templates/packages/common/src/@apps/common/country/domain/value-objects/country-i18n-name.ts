import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryI18NName extends StringValueObject
{
    public readonly type: 'CountryI18NName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryI18NName',
            nullable   : false,
            undefinable: false,
            
        }, validationRules));
    }
}