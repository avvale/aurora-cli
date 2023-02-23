import { JsonValueObject, ValidationRules } from '@aurora-ts/core';

export class HttpCommunicationTags extends JsonValueObject
{
    public readonly type: string = 'HttpCommunicationTags';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationTags',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}