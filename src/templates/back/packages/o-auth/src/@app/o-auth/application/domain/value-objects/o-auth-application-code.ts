import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationCode extends StringValueObject
{
    public readonly type: string = 'OAuthApplicationCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationCode',
            nullable   : false,
            undefinable: false,
            maxLength  : 63,
        }, validationRules));
    }
}