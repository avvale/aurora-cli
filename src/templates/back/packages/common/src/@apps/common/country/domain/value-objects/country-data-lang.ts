import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryDataLang extends JsonValueObject
{
    public readonly type: 'CountryDataLang';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryDataLang',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}