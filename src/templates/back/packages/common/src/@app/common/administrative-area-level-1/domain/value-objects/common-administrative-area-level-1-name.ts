import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Name extends StringValueObject
{
    public readonly type: string = 'CommonAdministrativeAreaLevel1Name';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAdministrativeAreaLevel1Name',
            nullable   : false,
            undefinable: false,
            maxLength  : 127,
        }, validationRules));
    }
}