import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationEvent extends EnumValueObject
{
    public readonly type: string = 'AuditingHttpCommunicationEvent';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuditingHttpCommunicationEvent',
            nullable   : false,
            undefinable: false,
            enumOptions: ['REQUEST_FULFILLED','REQUEST_REJECTED','RESPONSE_FULFILLED','RESPONSE_REJECTED'],
        }, validationRules));
    }
}