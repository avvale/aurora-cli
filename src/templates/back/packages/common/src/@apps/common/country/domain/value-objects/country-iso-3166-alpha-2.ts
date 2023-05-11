import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryIso3166Alpha2 extends StringValueObject
{
    public readonly type: 'CountryIso3166Alpha2';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryIso3166Alpha2',
            nullable   : false,
            undefinable: false,
            length     : 2,

        }, validationRules));
    }
}