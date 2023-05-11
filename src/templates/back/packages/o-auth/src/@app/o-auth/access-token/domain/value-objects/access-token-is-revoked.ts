import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AccessTokenIsRevoked extends BooleanValueObject
{
    public readonly type: string = 'AccessTokenIsRevoked';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AccessTokenIsRevoked',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}