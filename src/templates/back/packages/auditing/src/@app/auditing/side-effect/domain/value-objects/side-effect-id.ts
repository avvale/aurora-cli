import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectId extends UuidValueObject
{
    public readonly type: string = 'SideEffectId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}