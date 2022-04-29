import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class ClientIsMaster extends BooleanValueObject
{
    public readonly type: 'ClientIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientIsMaster',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}