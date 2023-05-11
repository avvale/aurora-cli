import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationMethod extends StringValueObject
{
    public readonly type: string = 'HttpCommunicationMethod';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationMethod',
            nullable   : false,
            undefinable: false,
            maxLength  : 25,
        }, validationRules));
    }
}