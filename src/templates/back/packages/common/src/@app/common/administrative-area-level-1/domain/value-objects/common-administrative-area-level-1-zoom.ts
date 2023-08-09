import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Zoom extends IntValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1Zoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1Zoom',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}