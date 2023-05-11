import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationHttpRequest extends JsonValueObject
{
    public readonly type: string = 'HttpCommunicationHttpRequest';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationHttpRequest',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}