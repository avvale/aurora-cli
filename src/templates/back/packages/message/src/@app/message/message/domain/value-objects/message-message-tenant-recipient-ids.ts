import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageTenantRecipientIds extends JsonValueObject
{
    public readonly type: string = 'MessageMessageTenantRecipientIds';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'MessageMessageTenantRecipientIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}