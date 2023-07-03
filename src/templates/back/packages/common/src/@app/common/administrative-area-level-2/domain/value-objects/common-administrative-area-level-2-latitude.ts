import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2Latitude extends DecimalValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel2Latitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2Latitude',
            nullable   : true,
            undefinable: true,
            decimals   : [16, 14],
            unsigned   : false,
        }, validationRules));
    }
}