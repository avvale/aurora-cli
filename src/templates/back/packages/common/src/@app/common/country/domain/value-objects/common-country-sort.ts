import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountrySort extends SmallintValueObject
{
    public readonly type: string = 'CommonCountrySort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountrySort',
            nullable   : true,
            undefinable: true,
            unsigned   : true,
        }, validationRules));
    }
}