import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SideEffectMethod extends EnumValueObject
{
    public readonly type: string = 'SideEffectMethod';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'SideEffectMethod',
            nullable   : false,
            undefinable: false,
            enumOptions: ['GET','POST','UPDATE','DELETE'],
        }, validationRules));
    }
}