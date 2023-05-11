import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2Latitude extends DecimalValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Latitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2Latitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}