import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryLatitude extends DecimalValueObject
{
    public readonly type: 'CountryLatitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryLatitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}