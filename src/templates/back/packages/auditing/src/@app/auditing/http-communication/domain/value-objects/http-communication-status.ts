import { SmallintValueObject, ValidationRules } from '@aurora-ts/core';

export class HttpCommunicationStatus extends SmallintValueObject
{
    public readonly type: string = 'HttpCommunicationStatus';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationStatus',
            nullable   : true,
            undefinable: true,
            maxLength  : 5,
            unsigned   : true,
        }, validationRules));
    }
}