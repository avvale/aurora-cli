import { DecimalValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryLatitude extends DecimalValueObject
{
    public readonly type: 'CountryLatitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryLatitude',
            nullable   : true,
            undefinable: true,
            maxLength  : 17,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}