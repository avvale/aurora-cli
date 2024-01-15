import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Zoom extends SmallintValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1Zoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1Zoom',
            nullable   : true,
            undefinable: true,
            unsigned   : true,
        }, validationRules));
    }
}