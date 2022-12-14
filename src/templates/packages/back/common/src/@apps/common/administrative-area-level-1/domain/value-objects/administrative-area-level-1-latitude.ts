import { DecimalValueObject, ValidationRules } from '@aurora-ts/core';

export class AdministrativeAreaLevel1Latitude extends DecimalValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Latitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Latitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}