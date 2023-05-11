import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2Code extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Code';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2Code',
            nullable   : false,
            undefinable: false,
            maxLength  : 8,
        }, validationRules));
    }
}