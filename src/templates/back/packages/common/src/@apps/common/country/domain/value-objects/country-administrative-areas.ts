import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CountryAdministrativeAreas extends JsonValueObject
{
    public readonly type: 'CountryAdministrativeAreas';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryAdministrativeAreas',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}