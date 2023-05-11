import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel3Name extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Name';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3Name',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}