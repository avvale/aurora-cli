import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class HttpCommunicationId extends UuidValueObject
{
    public readonly type: string = 'HttpCommunicationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}