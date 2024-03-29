import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'SideEffectDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}