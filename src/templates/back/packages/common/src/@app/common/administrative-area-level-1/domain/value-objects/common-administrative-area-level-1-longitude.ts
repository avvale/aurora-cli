import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Longitude extends DecimalValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1Longitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1Longitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 14],
            unsigned   : false,
        }, validationRules));
    }
}