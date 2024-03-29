import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ClientAuthUrl extends StringValueObject
{
    public readonly type: string = 'ClientAuthUrl';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientAuthUrl',
            nullable   : true,
            undefinable: true,
            maxLength  : 2048,
        }, validationRules));
    }
}