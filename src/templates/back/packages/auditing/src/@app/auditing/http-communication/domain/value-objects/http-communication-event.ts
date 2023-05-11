import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationEvent extends EnumValueObject
{
    public readonly type: string = 'HttpCommunicationEvent';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationEvent',
            nullable   : false,
            undefinable: false,
            enumOptions: ['REQUEST_FULFILLED','REQUEST_REJECTED','RESPONSE_FULFILLED','RESPONSE_REJECTED'],
        }, validationRules));
    }
}