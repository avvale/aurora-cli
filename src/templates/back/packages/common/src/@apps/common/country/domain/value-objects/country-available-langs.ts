import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryAvailableLangs extends JsonValueObject
{
    public readonly type: 'CountryAvailableLangs';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryAvailableLangs',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}