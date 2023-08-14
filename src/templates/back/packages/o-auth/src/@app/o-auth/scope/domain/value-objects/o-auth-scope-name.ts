import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthScopeName extends StringValueObject
{
    public readonly type: string = 'OAuthScopeName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthScopeName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}