import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxTenantIds extends JsonValueObject
{
    public readonly type: string = 'MessageInboxTenantIds';

    constructor(value: any[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'MessageInboxTenantIds',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}