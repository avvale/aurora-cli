import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2Longitude extends DecimalValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Longitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2Longitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 4],
            unsigned   : false,
        }, validationRules));
    }
}