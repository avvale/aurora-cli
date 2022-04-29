import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class AccessTokenIsRevoked extends BooleanValueObject
{
    public readonly type: 'AccessTokenIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenIsRevoked',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}