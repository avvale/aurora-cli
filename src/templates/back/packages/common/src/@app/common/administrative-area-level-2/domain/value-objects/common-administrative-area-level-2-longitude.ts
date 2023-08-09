import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2Longitude extends DecimalValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel2Longitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel2Longitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 14],
            unsigned   : false,
        }, validationRules));
    }
}