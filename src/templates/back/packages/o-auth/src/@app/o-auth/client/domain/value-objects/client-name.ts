import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ClientName extends StringValueObject
{
    public readonly type: string = 'ClientName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}