import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAttachmentDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}