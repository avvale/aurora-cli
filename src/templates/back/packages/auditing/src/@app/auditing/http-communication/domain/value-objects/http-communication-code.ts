import { StringValueObject, ValidationRules } from '@aurora-ts/core';

export class HttpCommunicationCode extends StringValueObject
{
    public readonly type: string = 'HttpCommunicationCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 100,
        }, validationRules));
    }
}