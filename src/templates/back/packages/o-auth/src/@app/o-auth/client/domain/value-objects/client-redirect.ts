import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ClientRedirect extends StringValueObject
{
    public readonly type: string = 'ClientRedirect';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientRedirect',
            nullable   : true,
            undefinable: true,
            maxLength  : 2048,
        }, validationRules));
    }
}