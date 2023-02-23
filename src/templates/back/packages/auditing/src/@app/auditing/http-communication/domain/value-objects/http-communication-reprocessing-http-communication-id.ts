import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class HttpCommunicationReprocessingHttpCommunicationId extends UuidValueObject
{
    public readonly type: string = 'HttpCommunicationReprocessingHttpCommunicationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationReprocessingHttpCommunicationId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}