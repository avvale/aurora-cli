import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ClientCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'ClientCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ClientCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}