import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryAdministrativeAreas extends JsonValueObject
{
    public readonly type: string = 'CountryAdministrativeAreas';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryAdministrativeAreas',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}