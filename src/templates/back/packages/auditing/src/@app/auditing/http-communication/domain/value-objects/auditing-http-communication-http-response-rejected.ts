import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationHttpResponseRejected extends JsonValueObject
{
    public readonly type: string = 'AuditingHttpCommunicationHttpResponseRejected';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingHttpCommunicationHttpResponseRejected',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}