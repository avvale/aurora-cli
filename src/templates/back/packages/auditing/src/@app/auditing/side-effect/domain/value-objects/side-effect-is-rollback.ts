import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectIsRollback extends BooleanValueObject
{
    public readonly type: string = 'SideEffectIsRollback';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectIsRollback',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}