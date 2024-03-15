import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'WhatsappConversationUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappConversationUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}