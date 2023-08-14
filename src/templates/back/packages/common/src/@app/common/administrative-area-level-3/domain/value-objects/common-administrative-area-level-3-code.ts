import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3Code extends StringValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel3Code';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel3Code',
            nullable   : false,
            undefinable: false,
            maxLength  : 8,
        }, validationRules));
    }
}