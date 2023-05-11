import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryLongitude extends DecimalValueObject
{
    public readonly type: 'CountryLongitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryLongitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}