import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Name extends StringValueObject
{
    public readonly type: string = 'AdministrativeAreaLevel1Name';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Name',
            nullable   : false,
            undefinable: false,
            maxLength  : 100,
        }, validationRules));
    }
}