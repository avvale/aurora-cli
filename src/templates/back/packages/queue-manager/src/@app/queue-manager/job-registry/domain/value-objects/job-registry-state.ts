import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class JobRegistryState extends EnumValueObject
{
    public readonly type: string = 'JobRegistryState';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryState',
            nullable   : false,
            undefinable: false,
            enumOptions: ['COMPLETED','WAITING','ACTIVE','DELAYED','FAILED','PAUSED'],
        }, validationRules));
    }
}