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
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}