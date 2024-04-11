import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'MessageMessageCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'MessageMessageCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}