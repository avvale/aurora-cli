import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'HttpCommunicationCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}