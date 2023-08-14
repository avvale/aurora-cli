import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Code extends StringValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1Code';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1Code',
            nullable   : false,
            undefinable: false,
            maxLength  : 8,
        }, validationRules));
    }
}