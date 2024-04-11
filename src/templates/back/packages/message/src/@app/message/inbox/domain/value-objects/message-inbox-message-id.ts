import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxMessageId extends UuidValueObject
{
    public readonly type: string = 'MessageInboxMessageId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'MessageInboxMessageId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}