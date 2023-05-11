import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationHttpResponse extends JsonValueObject
{
    public readonly type: string = 'HttpCommunicationHttpResponse';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationHttpResponse',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}