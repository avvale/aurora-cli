import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class HttpCommunicationHttpResponseRejected extends JsonValueObject
{
    public readonly type: string = 'HttpCommunicationHttpResponseRejected';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationHttpResponseRejected',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}