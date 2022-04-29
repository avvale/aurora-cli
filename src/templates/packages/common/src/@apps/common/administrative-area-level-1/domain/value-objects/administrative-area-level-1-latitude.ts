import { DecimalValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel1Latitude extends DecimalValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Latitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Latitude',
            nullable   : true,
            undefinable: true,
            maxLength  : 17,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}