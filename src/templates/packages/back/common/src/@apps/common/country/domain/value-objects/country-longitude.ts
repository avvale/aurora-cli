import { DecimalValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryLongitude extends DecimalValueObject
{
    public readonly type: 'CountryLongitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryLongitude',
            nullable   : true,
            undefinable: true,
            maxLength  : 17,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}