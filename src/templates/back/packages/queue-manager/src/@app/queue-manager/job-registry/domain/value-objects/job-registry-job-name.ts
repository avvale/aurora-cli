import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class JobRegistryJobName extends StringValueObject
{
    public readonly type: string = 'JobRegistryJobName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryJobName',
            nullable   : true,
            undefinable: true,
            maxLength  : 50,
        }, validationRules));
    }
}