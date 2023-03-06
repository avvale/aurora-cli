import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurora-ts/core';

export class RoleIsMaster extends BooleanValueObject
{
    public readonly type: string = 'RoleIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RoleIsMaster',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}