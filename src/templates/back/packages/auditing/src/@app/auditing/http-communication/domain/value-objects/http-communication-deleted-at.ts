import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'HttpCommunicationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}