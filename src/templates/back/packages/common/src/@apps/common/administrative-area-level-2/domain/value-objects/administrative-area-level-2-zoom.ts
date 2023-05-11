import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2Zoom extends IntValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Zoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2Zoom',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}