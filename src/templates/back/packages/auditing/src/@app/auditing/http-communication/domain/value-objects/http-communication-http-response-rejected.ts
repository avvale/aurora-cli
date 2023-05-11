import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

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