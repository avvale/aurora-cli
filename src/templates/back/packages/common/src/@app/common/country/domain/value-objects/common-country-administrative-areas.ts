import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryAdministrativeAreas extends JsonValueObject
{
    public readonly type: string = 'CommonCountryAdministrativeAreas';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonCountryAdministrativeAreas',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}