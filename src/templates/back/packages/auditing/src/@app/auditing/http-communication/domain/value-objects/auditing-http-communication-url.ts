import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationUrl extends StringValueObject
{
    public readonly type: string = 'AuditingHttpCommunicationUrl';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingHttpCommunicationUrl',
            nullable   : false,
            undefinable: false,
            maxLength  : 2048,
        }, validationRules));
    }
}