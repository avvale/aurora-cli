import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryLatitude extends DecimalValueObject
{
    public readonly type: string = 'CountryLatitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryLatitude',
            nullable   : true,
            undefinable: true,
            decimals   : [16, 14],
            unsigned   : false,
        }, validationRules));
    }
}