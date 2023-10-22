import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationReprocessingHttpCommunicationId extends UuidValueObject
{
    public readonly type: string = 'AuditingHttpCommunicationReprocessingHttpCommunicationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuditingHttpCommunicationReprocessingHttpCommunicationId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}