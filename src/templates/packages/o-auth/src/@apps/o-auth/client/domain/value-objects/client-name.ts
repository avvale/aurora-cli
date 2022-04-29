import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class ClientName extends StringValueObject
{
    public readonly type: 'ClientName';

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