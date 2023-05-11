import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel3Code extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Code';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3Code',
            nullable   : false,
            undefinable: false,
            maxLength  : 8,
        }, validationRules));
    }
}