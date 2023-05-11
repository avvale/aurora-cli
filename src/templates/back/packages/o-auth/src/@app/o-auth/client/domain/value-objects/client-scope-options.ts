import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ClientScopeOptions extends JsonValueObject
{
    public readonly type: string = 'ClientScopeOptions';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientScopeOptions',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}