import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class RefreshTokenIsRevoked extends BooleanValueObject
{
    public readonly type: 'RefreshTokenIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenIsRevoked',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}