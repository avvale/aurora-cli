import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel1Code extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Code';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Code',
            nullable   : false,
            undefinable: false,
            maxLength  : 8,
        }, validationRules));
    }
}