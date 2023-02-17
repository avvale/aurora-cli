import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class SideEffectUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'SideEffectUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}