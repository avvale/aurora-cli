import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccessTokenToken extends StringValueObject
{
    public readonly type: string = 'AccessTokenToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenToken',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}