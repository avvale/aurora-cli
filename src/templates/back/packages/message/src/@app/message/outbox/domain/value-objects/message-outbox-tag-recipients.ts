import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxTagRecipients extends JsonValueObject
{
    public readonly type: string = 'MessageOutboxTagRecipients';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'MessageOutboxTagRecipients',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}