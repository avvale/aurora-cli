import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'MessageOutboxUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'MessageOutboxUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}