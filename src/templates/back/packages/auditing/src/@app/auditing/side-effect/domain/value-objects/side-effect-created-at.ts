import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'SideEffectCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}