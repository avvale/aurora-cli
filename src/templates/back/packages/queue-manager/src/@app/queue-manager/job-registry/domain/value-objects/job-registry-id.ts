import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class JobRegistryId extends UuidValueObject
{
    public readonly type: string = 'JobRegistryId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}