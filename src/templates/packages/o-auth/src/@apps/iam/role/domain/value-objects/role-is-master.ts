import { BooleanValueObject, ValidationRules } from 'aurora-ts-core';

export class RoleIsMaster extends BooleanValueObject
{
    public readonly type: 'RoleIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'RoleIsMaster',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}