import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonCountryMapType extends EnumValueObject
{
    public readonly type: string = 'CountryMapType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryMapType',
            nullable   : false,
            undefinable: false,
            enumOptions: ['ROADMAP','SATELLITE','HYBRID','TERRAIN'],
        }, validationRules));
    }
}