import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class JobRegistryDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'JobRegistryDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'JobRegistryDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}