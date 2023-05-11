import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountrySort extends SmallintValueObject
{
    public readonly type: 'CountrySort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountrySort',
            nullable   : true,
            undefinable: true,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}