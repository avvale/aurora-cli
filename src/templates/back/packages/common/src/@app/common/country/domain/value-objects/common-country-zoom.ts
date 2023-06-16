import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryZoom extends IntValueObject
{
    public readonly type: string = 'CountryZoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryZoom',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}