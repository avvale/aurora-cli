import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AdministrativeAreaLevel1CustomCode extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel1CustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1CustomCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
        }, validationRules));
    }
}