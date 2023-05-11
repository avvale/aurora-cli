import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ClientSecret extends StringValueObject
{
    public readonly type: string = 'ClientSecret';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientSecret',
            nullable   : false,
            undefinable: false,
            maxLength  : 90,
        }, validationRules));
    }
}