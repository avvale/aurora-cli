import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'HttpCommunicationUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}