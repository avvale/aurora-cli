import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class JobRegistryJobId extends StringValueObject
{
    public readonly type: string = 'JobRegistryJobId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryJobId',
            nullable   : false,
            undefinable: false,
            maxLength  : 36,
        }, validationRules));
    }
}