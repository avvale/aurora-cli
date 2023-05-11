import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

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