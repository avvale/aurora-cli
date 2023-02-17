import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectOperationId extends UuidValueObject
{
    public readonly type: string = 'SideEffectOperationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectOperationId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}