import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationName extends StringValueObject
{
    public readonly type: string = 'OAuthApplicationName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthApplicationName',
            nullable   : false,
            undefinable: false,
            maxLength  : 128,
        }, validationRules));
    }
}