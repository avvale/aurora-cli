import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class QueueId extends UuidValueObject
{
    public readonly type: string = 'QueueId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'QueueId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}