import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationHttpRequestRejected extends JsonValueObject
{
    public readonly type: string = 'AuditingHttpCommunicationHttpRequestRejected';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingHttpCommunicationHttpRequestRejected',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}