import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientName extends StringValueObject
{
    public readonly type: string = 'OAuthClientName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'OAuthClientName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}