import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class JobRegistryTags extends JsonValueObject
{
    public readonly type: string = 'JobRegistryTags';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryTags',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}