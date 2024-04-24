import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappConversationTimelineId extends UuidValueObject
{
    public readonly type: string = 'WhatsappConversationTimelineId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'WhatsappConversationTimelineId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}