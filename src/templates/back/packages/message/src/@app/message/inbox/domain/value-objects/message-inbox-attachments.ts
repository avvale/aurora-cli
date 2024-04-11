import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxAttachments extends JsonValueObject
{
    public readonly type: string = 'MessageInboxAttachments';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'MessageInboxAttachments',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}