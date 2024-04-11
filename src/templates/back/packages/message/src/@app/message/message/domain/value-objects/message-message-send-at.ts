import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageSendAt extends TimestampValueObject
{
    public readonly type: string = 'MessageMessageSendAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'MessageMessageSendAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}