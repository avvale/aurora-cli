import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel3Zoom extends IntValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Zoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3Zoom',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}