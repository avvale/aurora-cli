import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class AdministrativeAreaLevel1Name extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Name';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel1Name',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}