import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel1Longitude extends DecimalValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Longitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Longitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}