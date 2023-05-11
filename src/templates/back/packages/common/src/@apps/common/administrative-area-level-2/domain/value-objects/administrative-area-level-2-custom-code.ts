import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel2CustomCode extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2CustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2CustomCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
        }, validationRules));
    }
}