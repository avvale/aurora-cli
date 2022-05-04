import { JsonValueObject, ValidationRules } from 'aurora-ts-core';

export class ClientScopes extends JsonValueObject
{
    public readonly type: 'ClientScopes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientScopes',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}