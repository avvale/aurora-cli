import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryZoom extends IntValueObject
{
    public readonly type: string = 'CommonCountryZoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountryZoom',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}