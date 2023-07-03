import { DecimalValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Longitude extends DecimalValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel1Longitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Longitude',
            nullable   : true,
            undefinable: true,
            decimals   : [17, 14],
            unsigned   : false,
        }, validationRules));
    }
}