import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageConversationId extends UuidValueObject
{
    public readonly type: string = 'WhatsappMessageConversationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappMessageConversationId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}