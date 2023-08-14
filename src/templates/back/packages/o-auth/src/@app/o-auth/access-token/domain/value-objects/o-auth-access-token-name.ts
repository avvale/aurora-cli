import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthAccessTokenName extends StringValueObject
{
    public readonly type: string = 'OAuthAccessTokenName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthAccessTokenName',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}