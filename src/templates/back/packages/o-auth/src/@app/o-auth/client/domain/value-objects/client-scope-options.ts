import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientScopeOptions extends JsonValueObject
{
    public readonly type: 'ClientScopeOptions';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientScopeOptions',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}