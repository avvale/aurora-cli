import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryIso3166Numeric extends StringValueObject
{
    public readonly type: string = 'CountryIso3166Numeric';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryIso3166Numeric',
            nullable   : false,
            undefinable: false,
            length     : 3,
        }, validationRules));
    }
}