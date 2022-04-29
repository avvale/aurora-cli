import { DecimalValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel3Latitude extends DecimalValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Latitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3Latitude',
            nullable   : true,
            undefinable: true,
            maxLength  : 17,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}