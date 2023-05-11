import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectAccountId extends UuidValueObject
{
    public readonly type: string = 'SideEffectAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectAccountId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}