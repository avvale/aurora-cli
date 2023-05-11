import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2Name extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Name';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2Name',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}