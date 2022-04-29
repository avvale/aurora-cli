import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class ClientAuthUrl extends StringValueObject
{
    public readonly type: 'ClientAuthUrl';

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