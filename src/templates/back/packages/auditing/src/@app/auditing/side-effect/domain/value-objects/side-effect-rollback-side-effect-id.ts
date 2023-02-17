import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectRollbackSideEffectId extends UuidValueObject
{
    public readonly type: string = 'SideEffectRollbackSideEffectId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectRollbackSideEffectId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}