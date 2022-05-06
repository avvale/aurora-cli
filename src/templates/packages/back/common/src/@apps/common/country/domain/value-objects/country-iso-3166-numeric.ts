import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryIso3166Numeric extends StringValueObject
{
    public readonly type: 'CountryIso3166Numeric';

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